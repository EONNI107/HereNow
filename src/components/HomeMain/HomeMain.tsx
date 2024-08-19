'use client';
import useAuthStore from '@/zustand/useAuthStore';
import React, { useEffect, useState } from 'react';
import Header from '../MainPage/Header';
import Main from '../MainPage/Main';
import WebMainPage from '@/app/(webmain)/webmain/page';

function HomeMain() {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  if (typeof window !== 'undefined') {
    return (
      <div>
        {isMobile ? (
          <>
            <Header
              title={user ? `${user.nickname}님만의` : '여러분만의'}
              content="맛집, 여행지를 공유해주세요!"
            />
            <Main />
          </>
        ) : (
          <WebMainPage />
        )}
      </div>
    );
  }
  if (typeof window === 'undefined') return;
}

export default HomeMain;
