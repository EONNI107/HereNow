import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="max-w-[400px] mx-auto w-full fixed bottom-0">
      <div className="flex justify-between w-full">
        <div>
          <Link href={'/'}>홈</Link>
        </div>
        <div>
          <Link href={'/'}>피드</Link>
        </div>
        <div>
          <Link href={'/'}>찜</Link>
        </div>
        <div>
          <Link href={'/'}>마이페이지</Link>
        </div>
      </div>
    </footer>
  );
}
