'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { searchApi } from '../api/searchApi';
import { searchedtype } from '@/app/search-page/page';
type SearchItemprops = {
  searchdata: searchedtype[];
  searchValue: string;
};
export default function SearchItem({
  searchdata,
  searchValue,
}: SearchItemprops) {
  const [resdata, setResdata] = useState<searchedtype[]>([]);
  const [resdatas, setResdatas] = useState<searchedtype[][]>([]);
  const [isshow, setIsshow] = useState<boolean>(true);

  useEffect(() => {
    const datas = async () => {
      const res: searchedtype[] = await searchApi(
        searchValue,
        '/api/search',
        12,
      );
      const res2: searchedtype[] = await searchApi(
        searchValue,
        '/api/search',
        14,
      );
      const res3: searchedtype[] = await searchApi(
        searchValue,
        '/api/search',
        39,
      );
      const res4: searchedtype[] = await searchApi(
        searchValue,
        '/api/search',
        15,
      );
      const resarrs = [res, res2, res3, res4];
      console.log(res);
      setResdatas(resarrs);
    };
    datas();
  }, [searchValue]);
  const handleClick1 = () => {
    setIsshow(false);
    const firstdata = resdatas[0];
    setResdata(firstdata);
  };
  const handleClick2 = () => {
    setIsshow(false);
    const firstdata = resdatas[1];
    setResdata(firstdata);
  };
  const handleClick3 = () => {
    setIsshow(false);
    const firstdata = resdatas[2];
    setResdata(firstdata);
  };
  const handleClick4 = () => {
    setIsshow(false);
    const firstdata = resdatas[3];
    setResdata(firstdata);
  };
  return (
    <>
      <div className="flex w-full border">
        <div className="shrink-0 px-1 py-1">정렬</div>
        <div className="flex border w-full items-center">
          <div className="w-full flex justify-center" onClick={handleClick1}>
            관광명소
          </div>
          <div className="w-full flex justify-center" onClick={handleClick2}>
            문화시설
          </div>
          <div className="w-full flex justify-center" onClick={handleClick3}>
            맛집
          </div>
          <div className="w-full flex justify-center" onClick={handleClick4}>
            행사
          </div>
        </div>
      </div>
      <div className="border w-full">
        <h2>행사</h2>
        <p>서울의 가볼만한 곳을 찾아드릴게요!</p>
      </div>
      <div className="w-full flex flex-col gap-2">
        {isshow ? (
          <>
            {searchdata?.map((item) => (
              <div key={item.contentid} className="w-full flex gap-3">
                <Image
                  src={item.firstimage}
                  alt="이미지"
                  width={100}
                  height={100}
                />
                <p className="">{item.title}</p>
                <div className="">
                  <Image src="/heart.png" alt="좋아요" width={20} height={20} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {resdata?.map((i) => (
              <div key={i.contentid} className="w-full flex gap-3">
                <Image
                  src={i.firstimage}
                  alt="이미지"
                  width={100}
                  height={100}
                />
                <p className="">{i.title}</p>
                <div className="">
                  <Image src="/heart.png" alt="좋아요" width={20} height={20} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
