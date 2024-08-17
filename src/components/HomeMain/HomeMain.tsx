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
    // 윈도우 창의 크기를 감지하는 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    // 컴포넌트가 처음 마운트 될 때와 창 크기 변화 시에 실행
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
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
