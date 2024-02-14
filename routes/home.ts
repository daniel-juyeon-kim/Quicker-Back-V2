import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send(`
    <form action="/AssociateOrder/single" method="POST">
        삭제할 오더의 행 번호를 입력하면 오더 테이블과 연관된 테이블들의 정보가 삭제됩니다.<br>
        해당 테이블 : Transportation, Sender, Recipient, Destination, Departure, Product, Order Transportation, Sender, Recipient, Destination, Departure, Product, Order <br>
        <input type="text" name="id" placeholder="삭제할 오더의 행 번호 입력"></input>
        <button type="submit">확인</button>
    </form>

    <form action="/AssociateOrder/multi" method="POST">
        <input type="text" name="startNumber" placeholder="삭제할 오더의 시작 행 번호 입력"></input>
        <input type="text" name="endNumber" placeholder="삭제할 오더의 끝 행 번호 입력"></input>
        <button type="submit">확인</button>
    </form>
  `);
});
export default router;
