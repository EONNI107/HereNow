import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer className="max-w-[400px] mx-auto w-full fixed bottom-0 z-10 ">
      <div className="flex justify-between px-5 py-5">
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <Image src="/home.png" alt="홈" width={20} height={20} />
            <p>홈</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <Image src="/menu.png" alt="피드" width={20} height={20} />
            <p>피드</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <Image src="/heart.png" alt="하트" width={20} height={20} />
            <p>찜</p>
          </div>
        </Link>
        <Link href={'/'}>
          <div className="flex flex-col items-center">
            <Image src="/user.png" alt="마이페이지" width={20} height={20} />
            <p>마이페이지</p>
          </div>
        </Link>
      </div>
    </footer>
  );
}
export default Footer;
