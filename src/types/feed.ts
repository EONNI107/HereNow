export type Feed = {
  content: string;
  createdAt: string;
  id: number;
  image: string | null;
  region: string | null;
  sigungu: string | null;
  title: string;
  userId: string;
  Users: Users;
  FeedLikes: { id: number }[];
  FeedComments: { id: number }[];
};

export type Users = {
  nickname: string;
  profileImage: string | null;
};
