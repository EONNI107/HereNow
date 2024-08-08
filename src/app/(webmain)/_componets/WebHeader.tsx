import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

function WebHeader() {
  return (
    <div className="w-full py-4 px-[340px] flex justify-center fixed right-0 left-0 mx-auto bg-[#999] z-10">
      <div className="flex gap-x-[90px] min-w-[1240px] h-[46px]">
        <div className="grow-0 font-medium text-[36px] flex justify-center items-center">
          <p>지금,여기</p>
        </div>
        <div className="grow relative py-3.5 px-6 rounded-3xl bg-[#F2F1FA]">
          <input
            type="text"
            placeholder="검색창"
            className="w-full bg-[#F2F1FA] h-[18px]"
          />
          <button className="absolute top-4 right-5 w-4 h-4 ">
            <MagnifyingGlassIcon className="w-full h-full" />
          </button>
        </div>
        <div className="grow-0 flex justify-center items-center">
          <button className="py-2 px-4 bg-[#CACACA]">시작하기</button>
        </div>
      </div>
    </div>
  );
}

export default WebHeader;
