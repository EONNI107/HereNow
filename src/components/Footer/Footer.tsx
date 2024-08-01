import {
  HeartIcon,
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="max-w-[400px] mx-auto w-full fixed bottom-0 z-10 bg-white ">
      <div className="flex justify-between px-5 py-5">
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <HomeIcon className="w-5 h-5" />
            <p>홈</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <Squares2X2Icon className="w-5 h-5" />
            <p>피드</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <HeartIcon className="w-5 h-5" />
            <p>찜</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <UserIcon className="w-5 h-5" />
            <p>마이페이지</p>
          </div>
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
