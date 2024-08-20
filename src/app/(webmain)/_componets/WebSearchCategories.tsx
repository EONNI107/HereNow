import { searchApi } from '@/components/MainPage/api/searchApi';
import { SearchedType } from '@/components/SearchMain/SearchMain';
import React, { useState } from 'react';

type WebSearchCategoriesProps = {
  query: string;
  setBasicData: (state: SearchedType[]) => void;
};

function WebSearchCategories({
  query,
  setBasicData,
}: WebSearchCategoriesProps) {
  const [clickSearchClass, setClickSearchClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });
  const handleCategoryClick = async (title: string, apiType: number) => {
    const res: SearchedType[] = await searchApi(query, '/api/search', apiType);
    const sortedData = res?.slice(0, 4) as SearchedType[];
    setBasicData(sortedData);
    setClickSearchClass({
      title,
      classname: 'border-blue4 bg-blue5 text-white',
    });
  };
  const categories = [
    { title: '관광명소', apiType: 12 },
    { title: '문화시설', apiType: 14 },
    { title: '맛집', apiType: 39 },
    { title: '행사', apiType: 15 },
  ];
  return (
    <div className="flex w-full items-center gap-8 justify-center">
      {categories.map((category) => (
        <div
          key={category.title}
          className={`w-[91px] h-[38px] cursor-pointer flex justify-center items-center rounded-[16px] border-[2px] transition-colors duration-300 ${
            clickSearchClass.title === category.title
              ? clickSearchClass.classname
              : 'border-sub2 bg-white text-sub1'
          }`}
          onClick={() => handleCategoryClick(category.title, category.apiType)}
        >
          <p className="shrink-0">{category.title}</p>
        </div>
      ))}
    </div>
  );
}

export default WebSearchCategories;
