import React from 'react';
import Image from 'next/image';
export default function SearchItem({ searchdata }) {
  return (
    <>
      {
        <ul>
          {searchdata?.map((item) => (
            <div key={item.contentid}>
              <Image
                src={item.firstimage}
                alt="이미지"
                className="w-auto h-auto"
                width={100}
                height={100}
              />
              <li>{item.title}</li>
            </div>
          ))}
        </ul>
      }
    </>
  );
}
