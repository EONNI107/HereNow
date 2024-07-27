'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { searchApi } from '../(main)/api/searchApi';
import SearchItem from '../(main)/_components/search/SearchItem';

export default function SeachDetailPage() {
  const [searchdata, setSearchdata] = useState([]);
  const searchparams = useSearchParams();
  const searchValue = searchparams.get('q');

  const searched = async () => {
    const res = await searchApi(searchValue, '/api/search');
    // ui저장 state
    setSearchdata(res);
  };

  useEffect(() => {
    searched();
  }, [searchValue]);

  return (
    <div className="flex pt-[25px] flex-col items-center justify-center max-w-[400px] mx-auto">
      <SearchItem searchdata={searchdata} />
    </div>
  );
}
