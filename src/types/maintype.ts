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

export type tableType = Tables<'Feeds'>;
