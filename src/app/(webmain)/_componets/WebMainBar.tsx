'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

function WebMainBar({
  title,
  content,
  url,
}: {
  title: string;
  content: string;
  url?: string | number;
}) {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between">
      <div>
        <p className="text-lg not-italic font-medium leading-[150%]">{title}</p>
        <h2 className="text-[2.50rem] not-italic font-semibold leading-[150%]">
          {content}
        </h2>
      </div>
      <div className="flex items-end">
        <button
          onClick={() => router.push(`${url}`)}
          className="border-solid border-orange3 border text-orange3 text-base font-semibold leading-[150%] py-2 px-4 rounded-xl hover:bg-orange3 hover:text-gray0 transition-colors duration-300"
        >
          더보기
        </button>
      </div>
    </div>
  );
}

export default WebMainBar;
