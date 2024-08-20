import { TableFeedType } from '@/types/mainTypes';
import axios from 'axios';
import React, { useState } from 'react';
type WebFeedCategoriesProps = {
  query: string;
  setFeedData: (state: TableFeedType[]) => void;
};
function WebFeedCategories({ query, setFeedData }: WebFeedCategoriesProps) {
  const [clickClass, setClickClass] = useState<{
    title: string;
    classname: string;
  }>({
    title: '',
    classname: '',
  });
  const handleCategoryFeedClick = async (category: string, title: string) => {
    setClickClass({
      title: title,
      classname: 'border-blue4 bg-blue5 text-white',
    });

    const res = await axios.post('/api/supabase-sortedfeed', {
      searchValue: query,
      title: category,
    });
    console.log(res);
    const datas = res.data;
    const sortedData = datas?.slice(0, 4) as TableFeedType[];
    setFeedData(sortedData);
  };
  const categories = [
    { title: '관광' || '명소', label: '관광명소' },
    { title: '문화', label: '문화시설' },
    { title: '맛집', label: '맛집' },
    { title: '축제' || '행사', label: '행사' },
  ];
  return (
    <div className="flex w-full items-center gap-8 justify-center">
      {categories.map((category) => (
        <div
          key={category.title}
          className={`w-[91px] h-[38px] cursor-pointer flex justify-center items-center rounded-[16px] border-[2px] transition-colors duration-300 ${
            clickClass.title === category.label
              ? clickClass.classname
              : 'border-sub2 bg-white text-sub1'
          }`}
          onClick={() =>
            handleCategoryFeedClick(category.title, category.label)
          }
        >
          <p className="shrink-0">{category.label}</p>
        </div>
      ))}
    </div>
  );
}

export default WebFeedCategories;
