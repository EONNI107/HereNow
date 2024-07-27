'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// const localitems = JSON.parse(localStorage.getItem('search') || '') || [];
export default function SearchForm({ setIsbg }) {
  const [inputValue, setInputValue] = useState('');
  const [storgedata, setStorgedata] = useState<string[]>([
    localStorage.getItem('search'),
  ]);

  const router = useRouter();
  const handleClick = () => {
    router.push(`/searchpage?q=${inputValue}`);
    setIsbg(false);
    // 최근검색어 저장 state
    setStorgedata([...storgedata, inputValue]);
  };

  localStorage.setItem('search', storgedata);
  const newstorgedata = storgedata[0].split(',');
  const originaldata = newstorgedata.filter(
    (item, index, arr) => arr.indexOf(item) === index,
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClose = (i) => {
    console.log('click');

    const filtereddata = originaldata.filter((data) => data !== i);

    setStorgedata([filtereddata.join(',')]);
  };

  const handlemoveclick = (e) => {
    router.push(`/searchpage?q=${e.target.innerHTML}`);
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
          return;
        }
        return (
          <>
            <div key={index} className="flex ">
              <li key={index} onClick={handlemoveclick}>
                {i}
              </li>
              <button onClick={() => handleClose(i)}>x</button>
            </div>
          </>
        );
      })}
    </div>
  );
}
