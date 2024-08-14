'use client';
import React, { useEffect, useState } from 'react';
import { searchApi } from '@/components/MainPage/api/searchApi';
import { useSearchParams } from 'next/navigation';
import { SearchedType } from '@/app/(layout)/search-page/page';
import WebSearchItem from './WebSearchItem';
import axios from 'axios';
import { TableFeedType } from '@/types/mainTypes';
import { showToast } from '@/utils/toastHelper';
import WebFeedItem from './WebFeedItem';

function WebFeedSearchItem() {
  const [basicData, setBasicData] = useState<SearchedType[]>([]);
  const [feedData, setFeedData] = useState<TableFeedType[]>([]);
  const params = useSearchParams();
  const query = params.get('q') as string;

  useEffect(() => {
    const searchFeedData = async () => {
      try {
        const res = await axios.get('/api/supabase-searchfeed', {
          params: {
            searchValue: query,
          },
        });
        setFeedData(res.data.data as TableFeedType[]);
      } catch (error) {
        showToast('error', '피드를 불러오는데 오류가 발생했습니다.');
      }
    };
    const searchData = async () => {
      try {
        const res = await searchApi(query, '/api/search');
        setBasicData(res);
      } catch (error) {
        showToast('error', '피드를 불러오는데 오류가 발생했습니다.');
      }
    };
    searchData();
    searchFeedData();
  }, [query]);

  return (
    <div className="w-full flex flex-col gap-y-[39px]">
      <div className="w-full">
        <h2 className="text-4xl font-semibold leading-[150%] flex">
          {query}을 찾으세요?
        </h2>
      </div>
      <div className="w-full flex justify-center gap-[36px]">
        <div className="w-full flex flex-col items-center gap-y-[39px]">
          <div className="w-full px-6 py-2 flex border-b-blue4 border-b-2 items-center justify-center">
            <h3 className="text-2xl font-medium leading-[150%]">피드</h3>
          </div>
          <div className="w-full flex flex-col gap-4">
            {feedData?.map((item) => (
              <WebFeedItem item={item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-y-[39px]">
          <div className=" w-full px-6 py-2 flex border-b-orange3 border-b-2 items-center justify-center">
            <h3 className="text-2xl font-medium leading-[150%]">행사</h3>
          </div>
          <div className="w-full flex flex-col gap-4">
            {basicData?.map((item) => (
              <WebSearchItem item={item} key={item.contentid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebFeedSearchItem;
