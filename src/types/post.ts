export type Post = {
  id: number;
  userId: string;
  title: string;
  content: string;
  image: string[];
  region: string;
  sigungu: string;
  createdAt: string;
  userProfile?: {
    profileImage: string | null;
    nickname: string | null;
  };
};
