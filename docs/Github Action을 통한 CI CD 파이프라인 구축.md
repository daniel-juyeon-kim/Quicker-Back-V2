## Github Action을 통한 CI/CD 파이프라인 구축

### 문제

이전 프로젝트(Quicker V1)에서 PR을 병합하고 서버 프로젝트를 재배포하면서 다음과 같은 문제가 있었습니다.

- 기획 변경으로 팀원이 서버로 기능을 이식하면서 **개발보다 배포에 시간을 씀**
  - 서버 프로젝트에 **PR 병합이 증가하면 개발속도와 배포가 늦어짐**
- 코드 리뷰를 받고 싶지만 리뷰가 가능한 팀원이 없음
- 로컬 환경에서 테스트를 통과했지만, 배포 환경에서 문제가 발생함(주로 외부 환경, 코드 누락으로 문제 발생)

### 해결

CI/CD(Continuous Integration, Continuous Delivery/Deployment) 파이프라인을 구축해 **배포, 테스트, 코드 리뷰를 자동화**했습니다. 아래는 파이프라인의 구조입니다.

![CI/CD 파이프라인 이미지](./cicd-flow.drawio.svg)

CI/CD 툴 중에서 **적은 학습으로 빠르게 사용**할 수 있는 Github Action을 선택했습니다. 각 워크플로우에 대해 설명하겠습니다.

#### 테스트

테스트 워크플로우는 **PR이 생성되면 테스트를 실행해 설정, 코드가 누락된 상태로 배포되는걸 방지**합니다.

```yaml
name: Test

on: 
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Run testing
        uses: actions/setup-node@v4
        with:
          node-version: "latest"
      - run: |
          set -e
          npm run install-test-package
          npm test
```

#### 코드 리뷰

테스트 워크플로우가 종료되면 코드 리뷰 워크플로우가 동작합니다. 코드 리뷰 워크플로우는 **OpenAI API를 통해 코드 리뷰**하는데 프롬프트로 **역할**과 **응답 템플릿**을 설정해 **일관된 코드 리뷰**를 받습니다.

![github action llm code review](<./github llm code review.png>)

> **NOTE**\
> 네이버 D2에서 [LLM을 이용한 AI 코드 리뷰 도입기](https://d2.naver.com/helloworld/7321313)를 참고했습니다.

LLM의 코드 리뷰가 프로젝트 전체를 이해한 답변은 아니지만 **개선점을 찾는 데 도움이 되었습니다.** 코드 작성자는 **납득되는 리뷰를 빠르게 반영**하고 코드 리뷰어는 **부족한 리뷰만 보완해 코드 리뷰 작성 시간을 단축**할 수 있습니다.

```yaml
name: Code Review

permissions:
  contents: read
  pull-requests: write

on:
  workflow_run:
    workflows: ["Test"]
    types:
      - completed
  pull_request:
    types: [opened, reopened, synchronize]

jobs:
  code-review:
    runs-on: ubuntu-latest

    steps:
      - uses: anc95/ChatGPT-CodeReview@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          LANGUAGE: Korean
          OPENAI_API_ENDPOINT: https://api.openai.com/v1
          MODEL: gpt-4o-mini
          PROMPT: |
            # 코드 리뷰 프롬프트입니다.
            You are a TypeScript code reviewer. Write code reviews as concisely as possible.
              -	Only review significant parts of added or modified TypeScript code.
              -	Use the markdown template below for the review:

              ## Summary

              ### Readability

              ### Optimization

              ### Security

              Explanation of the Template:

                - Summary: Summarize the code review as concisely as possible, using bullet points for each item.
                - Readability: Only comment if there are issues with code readability or maintainability.
                - Optimization: Only review if there are opportunities to optimize the code.
                - Security: Only review if there are potential security concerns.

              If there is nothing to review, do not write a review.

          top_p: 1
          temperature: 1
          max_tokens: 4096
          MAX_PATCH_LENGTH: 10000
```

#### 빌드, 배포

코드 리뷰가 끝나고 PR이 병합되면 빌드, 배포 워크플로우가 실행됩니다. 빌드 워크플로우는 프로젝트를 도커 이미지로 빌드하고 GitHub Container Registry에 올립니다. 배포 워크플로우는 다음 과정을 거쳐 배포됩니다.

1. 도커 설정 파일을 운영 서버로 전송
2. 운영 서버에 접속
3. 이전에 배포된 이미지와 컨테이너 중단 및 삭제
4. Github Container Registry 로그인
5. 프로젝트 이미지 설치
6. 컨테이너 실행
7. 배포 중에 생성된 환경 설정 파일 제거

배포 자동화로 작업 내용이 빠르게 운영 서버에 배포되고 개발자는 **배포보다 개발에 더 집중할 수 있습니다.**

```yml
name: Deploy

on:
  workflow_run:
    workflows: ["Build"]
    types: [completed]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          sparse-checkout: docker-compose.yml
          sparse-checkout-cone-mode: false
      - run: |
          set -e
          git checkout HEAD^

      # EC2로 docker-compose.yml파일 전송
      - name: Send docker-compose.yml to ec2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_IP }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "./docker-compose.yml"
          target: "/home/${{ secrets.EC2_USERNAME }}"

      # EC2 접속 후 설치 시작
      - name: Deploy server to ec2
        uses: appleboy/ssh-action@v1.0.3
        env:
          LATEST_PACKAGE_URL: ghcr.io/${{ github.repository }}:latest
          BASIC_PACKAGE_URL: ghcr.io/${{ github.repository }}
        with:
          host: ${{ secrets.EC2_IP }}
          key: ${{ secrets.EC2_SSH_KEY }}
          username: ${{ secrets.EC2_USERNAME }}
          script: |
            set -e

            # .env 파일 생성
            printf "%s\n" "${{ secrets.DOT_ENV }}" > .env && echo "IMAGE_NAME=${{ env.LATEST_PACKAGE_URL }}" >> .env

            # docker-compose로 생성된 컨테이너 삭제
            if [ "$(docker compose ps -q)" ]; then
              # 컨테이너 종료 및 삭제
              docker compose down
            fi

            # 기존에 env.BASIC_PACKAGE_URL인 이미지가 있다면
            if docker images | grep -q "${{ env.BASIC_PACKAGE_URL }}"; then
              # 기존 이미지 삭제
              docker rmi $(docker images "${{ env.BASIC_PACKAGE_URL }}" -q)
            fi

            # github container registry 로그인
            echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.repository_owner }} --password-stdin

            # 새로 빌드된 이미지 설치
            docker pull ${{ env.LATEST_PACKAGE_URL }}

            # 컨테이너 실행
            docker compose up -d

            # 환경정보 파일 삭제
            rm .docker/config.json
            rm docker-compose.yml
            rm .env
```
