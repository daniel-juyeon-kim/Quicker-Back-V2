import { existString } from "../util";

export type WalletAddressQuery = { walletAddress: string };

export const walletAddressSchema = { walletAddress: existString };
