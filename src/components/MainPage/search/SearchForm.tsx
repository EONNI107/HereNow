'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';

type SetIsBgProps = {
  setIsbg: (a: boolean) => void;
};

export default function SearchForm({ setIsbg }: SetIsBgProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [storgedata, setStorgedata] = useState<string[]>(() => {
    const data = localStorage.getItem('search');
    return data ? data.split(',') : [];
  });

  const router = useRouter();

  const handleClick = () => {
    router.push(`/search-page?q=${inputValue}`);
    setIsbg(false);
    const updatedStorageData = [...storgedata, inputValue];
    setStorgedata(updatedStorageData);
    localStorage.setItem('search', updatedStorageData.join(','));
  };

  useEffect(() => {
    localStorage.setItem('search', storgedata.join(','));
  }, [storgedata]);

  const originaldata = storgedata.filter(
    (item, index, arr) => arr.indexOf(item) === index,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClose = (i: string) => {
    console.log('click');
    const filtereddata = storgedata.filter((data) => data !== i);
    setStorgedata(filtereddata);
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
          onChange={handleChange}
        />
        <button onClick={handleClick} className="border">
          검색
        </button>
      </div>
      <p>최근검색어</p>
      {originaldata.map((i, index) => {
        if (i === '') {
          return null;
        }
        return (
          <div key={index} className="flex ">
            <li onClick={handleMoveClick}>{i}</li>
            <button onClick={() => handleClose(i)}>x</button>
          </div>
        );
      })}
    </div>
  );
}
