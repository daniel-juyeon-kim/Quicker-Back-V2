export interface SmsApi {
  sendDeliveryTrackingMessage(url: string, to: string): void;
}
export type Body = {
  type: string;
  from: string;
  content: string;
  messages: {
    to: string;
  }[];
};
export type Headers = {
  "Content-Type": string;
  "x-ncp-apigw-timestamp": string;
  "x-ncp-iam-access-key": string;
  "x-ncp-apigw-signature-v2": string;
};
