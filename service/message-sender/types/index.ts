export interface MessageSender {
  sendDeliveryTrackingMessage(url: string, to: string): Promise<void>;
}
