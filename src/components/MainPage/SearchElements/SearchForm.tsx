'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';

type SetIsBgProps = {
  setIsbg: (a: boolean) => void;
};

function SearchForm({ setIsbg }: SetIsBgProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [storgeData, setStorgeData] = useState<string[]>(() => {
    const data = localStorage.getItem('search');
    return data ? data.split(',') : [];
  });

  const router = useRouter();

  const handleClick = () => {
    router.push(`/search-page?q=${inputValue}`);
    setIsbg(false);
    const updatedStorageData = [...storgeData, inputValue];
    setStorgeData(updatedStorageData);
    localStorage.setItem('search', updatedStorageData.join(','));
  };

  useEffect(() => {
    localStorage.setItem('search', storgeData.join(','));
  }, [storgeData]);

  const originalData = storgeData.filter(
    (item, index, arr) => arr.indexOf(item) === index,
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = (i: string) => {
    const filteredData = storgeData.filter((data) => data !== i);
    setStorgeData(filteredData);
  };

  const handleMoveClick = (e: MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    router.push(`/search-page?q=${target.innerHTML}`);
    setIsbg(false);
  };

  return (
    <div className="flex flex-col items-center pt-2 mx-auto">
      <form onSubmit={handleClick}>
        <input
          className="border bg-gray1 rounded-lg px-1 py-1 h-[25px]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <button className="ml-1 border-[2px] px-[10px] py-[1px] rounded-lg hover:border-blue4 hover:bg-blue0 hover:text-main">
          검색
        </button>
      </form>
      <p className="my-2">최근검색어</p>
      <div className="flex gap-2 flex-wrap justify-center">
        {originalData.map((item, index) => {
          if (item === '') {
            return null;
          }
          return (
            <div
              key={index}
              className="flex border-[2px] rounded-2xl px-3 py-1 mb-1 gap-2 hover:border-blue4 hover:bg-blue0 hover:text-main"
            >
              <li
                className="list-none cursor-pointer "
                onClick={handleMoveClick}
              >
                {item}
              </li>
              <button onClick={() => handleClose(item)}>
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SearchForm;
