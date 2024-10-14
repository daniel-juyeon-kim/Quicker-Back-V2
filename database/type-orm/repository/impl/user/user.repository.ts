export interface UserRepository {
  createUser(body: {
    user: {
      walletAddress: string;
      name: string;
      email: string;
      contact: string;
    };
    birthDate: Date;
    id: string;
  }): Promise<void>;
  updateUserProfileImageIdByWalletAddress(body: { imageId: string; walletAddress: string }): Promise<void>;
  findNameByWalletAddress(walletAddress: string): Promise<{ name: string }>;
  findUserProfileImageIdByWalletAddress(walletAddress: string): Promise<{ imageId: string }>;
}
