import { Tables } from './supabase';

export type Sigungu = {
  rnum: number;
  code: string;
  name: string;
};

export type Region = {
  rnum: number;
  code: string;
  name: string;
  ename: string;
  image: string;
  sigungu: Sigungu[];
};

export type Regions = {
  region: Region[];
};

export type TableFeedType = Tables<'Feeds'>;

export type TableFeedUserType = {
  FeedLikes: {
    feedId?: number;
  }[];
  Users: {
    nickname: string;
    profileImage?: string;
  };
} & TableFeedType;
