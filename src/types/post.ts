export type Post = {
  id: number;
  userId: string;
  title: string; // 추가된 부분
  content: string;
  image: string[];
  region: string;
  sigungu: string;
  createdAt: string;
  userProfile?: {
    profileImage: string;
    nickname: string;
  };
};
