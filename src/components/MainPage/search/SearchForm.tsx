'use client';
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
    <div className="flex flex-col items-center">
      <div>
        <input
          className="border"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleClick} className="border">
          검색
        </button>
      </div>
      <p>최근검색어</p>
      {originalData.map((item, index) => {
        if (item === '') {
          return null;
        }
        return (
          <div key={index} className="flex ">
            <li onClick={handleMoveClick}>{item}</li>
            <button onClick={() => handleClose(item)}>x</button>
          </div>
        );
      })}
    </div>
  );
}
export default SearchForm;
