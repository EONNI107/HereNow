'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchFeedItem from './SearchFeedItem';
import SkeletonSearchItem from '../Skeleton/SkeletonSearchItem';
import SearchIntroduction from './SearchIntroduction';
import { TableFeedType } from '@/types/mainType';
import { showToast } from '@/utils/toastHelper';

type searchProps = {
  searchValue: string;
};

const SearchFeed = ({ searchValue }: searchProps) => {
  const [searchFeedItems, setSearchFeedItems] = useState<TableFeedType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortedItems, setSortedItems] = useState<TableFeedType[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(true);
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });

  useEffect(() => {
    const searchFeedData = async () => {
      try {
        const res = await axios.get('/api/supabase-searchfeed', {
          params: {
            searchValue,
          },
        });
        setSearchFeedItems(res.data.data as TableFeedType[]);
      } catch (error) {
        showToast('error', '피드를 불러오는데 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    searchFeedData();
  }, [searchValue]);

  const handleCategoryClick = async (category: string, title: string) => {
    setClickClass({
      title,
      classname: 'border-blue4 bg-blue0 text-main',
    });

    try {
      const sortedRes = await axios.post('/api/supabase-sortedfeed', {
        title: category,
        searchValue,
      });
      setSortedItems(sortedRes.data.data as TableFeedType[]);
    } catch (error) {
      showToast('error', '카테고리 피드를 불러오는데 오류가 발생했습니다.');
    } finally {
      setIsSorted(false);
    }
  };

  const categories = [
    { title: '관광명소', label: '관광명소' },
    { title: '문화시설', label: '문화시설' },
    { title: '맛집', label: '맛집' },
    { title: '행사', label: '행사' },
  ];

  return (
    <>
      <div className="flex w-full py-2 px-4 bg-[#FFF]">
        <div className="flex w-full items-center gap-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className={`py-1 cursor-pointer w-full flex justify-center rounded-2xl border-[2px] ${
                clickClass.title === category.title
                  ? clickClass.classname
                  : 'border-sub2 bg-white text-sub1'
              }`}
              onClick={() =>
                handleCategoryClick(category.title, category.label)
              }
            >
              {category.label}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col py-[13px] px-4 gap-4 bg-gray0">
        <SearchIntroduction isIntroduce={false} />
        <div className="w-full flex flex-col gap-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonSearchItem key={index} />
              ))
            : isSorted
            ? searchFeedItems.map((item) => (
                <SearchFeedItem item={item} key={item.id} />
              ))
            : sortedItems.map((item) => (
                <SearchFeedItem item={item} key={item.id} />
              ))}
        </div>
      </div>
    </>
  );
};

export default SearchFeed;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import SearchFeedItem from './SearchFeedItem';
// import axios from 'axios';
// import { TableFeedType } from '@/types/mainType';
// import SkeletonSearchItem from '../Skeleton/SkeletonSearchItem';
// import SearchIntroduction from './SearchIntroduction';

// type searchProps = {
//   searchValue: string;
// };

// function SearchFeed({ searchValue }: searchProps) {
//   const [searchFeedItems, setSearchFeedItems] = useState<TableFeedType[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [sortedItems, setSortItems] = useState<TableFeedType[]>([]);
//   const [isSorted, setIsSorted] = useState<boolean>(true);
//   const [clickClass, setClickClass] = useState<{
//     title: string;
//     classname: string;
//   }>({
//     title: '',
//     classname: '',
//   });
//   useEffect(() => {
//     searchFeedData();
//   }, [searchValue]);
//   const searchFeedData = async () => {
//     const res = await axios.get('/api/supabase-searchfeed', {
//       params: {
//         searchValue,
//       },
//     });
//     const Feeditems = res.data.data as TableFeedType[];

//     setSearchFeedItems(Feeditems);
//     setIsLoading(false);
//   };
//   const handleAttractionsClick = async () => {
//     setClickClass({
//       title: '여행',
//       classname: 'border-blue4 bg-blue0 text-main',
//     });

//     const sortedRes = await axios.post('/api/supabase-sortedfeed', {
//       title: '여행',
//       searchValue,
//     });
//     const sortedarrs = sortedRes.data.data as TableFeedType[];
//     setSortItems(sortedarrs);
//     setIsSorted(false);
//   };
//   const handleCultureClick = async () => {
//     setClickClass({
//       title: '문화',
//       classname: 'border-blue4 bg-blue0 text-main',
//     });
//     const sortedRes = await axios.post('/api/supabase-sortedfeed', {
//       title: '문화',
//       searchValue,
//     });
//     const sortedarrs = sortedRes.data.data as TableFeedType[];
//     setSortItems(sortedarrs);
//     setIsSorted(false);
//   };

//   const handleRestaurantClick = async () => {
//     setClickClass({
//       title: '맛집',
//       classname: 'border-blue4 bg-blue0 text-main',
//     });
//     const sortedRes = await axios.post('/api/supabase-sortedfeed', {
//       title: '맛집',
//       searchValue,
//     });
//     const sortedarrs = sortedRes.data.data as TableFeedType[];
//     setSortItems(sortedarrs);
//     setIsSorted(false);
//   };

//   const handleFestivalClick = async () => {
//     setClickClass({
//       title: '행사',
//       classname: 'border-blue4 bg-blue0 text-main',
//     });
//     const sortedRes = await axios.post('/api/supabase-sortedfeed', {
//       title: '축제',
//       searchValue,
//     });
//     const sortedarrs = sortedRes.data.data as TableFeedType[];
//     setSortItems(sortedarrs);
//     setIsSorted(false);
//   };

//   return (
//     <>
//       <div className="flex w-full py-2 px-4 bg-[#FFF]">
//         <div className="flex w-full items-center gap-3">
//           <div
//             className={`py-1 cursor-pointer w-full flex justify-center rounded-2xl border-[2px] ${
//               clickClass.title === '여행'
//                 ? clickClass.classname
//                 : 'border-sub2 bg-white text-sub1'
//             }`}
//             onClick={handleAttractionsClick}
//           >
//             관광명소
//           </div>
//           <div
//             className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
//               clickClass.title === '문화'
//                 ? clickClass.classname
//                 : 'border-sub2 bg-white text-sub1'
//             }`}
//             onClick={handleCultureClick}
//           >
//             문화시설
//           </div>
//           <div
//             className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
//               clickClass.title === '맛집'
//                 ? clickClass.classname
//                 : 'border-sub2 bg-white text-sub1'
//             } `}
//             onClick={handleRestaurantClick}
//           >
//             맛집
//           </div>
//           <div
//             className={`py-1 cursor-pointer	w-full flex justify-center rounded-2xl border-[2px] ${
//               clickClass.title === '행사'
//                 ? clickClass.classname
//                 : 'border-sub2 bg-white text-sub1'
//             } `}
//             onClick={handleFestivalClick}
//           >
//             행사
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex flex-col py-[13px] px-4 gap-4">
//         <SearchIntroduction isIntroduce={false} />
//         <div className="w-full flex flex-col gap-4">
//           {isLoading
//             ? Array.from({ length: 10 }).map((_, index) => (
//                 <SkeletonSearchItem key={index} />
//               ))
//             : isSorted
//             ? searchFeedItems.map((item) => (
//                 <SearchFeedItem item={item} key={item.id} />
//               ))
//             : sortedItems.map((item) => (
//                 <SearchFeedItem item={item} key={item.id} />
//               ))}
//         </div>
//       </div>
//     </>
//   );
// }
// export default SearchFeed;
