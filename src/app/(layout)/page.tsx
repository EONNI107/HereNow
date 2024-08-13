'use client';
import Header from '@/components/MainPage/Header';
import Main from '@/components/MainPage/Main';
import useAuthStore from '@/zustand/useAuthStore';
import { useEffect, useState } from 'react';
import WebMainPage from '../(webmain)/webmain/page';
function Home() {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // 윈도우 창의 크기를 감지하는 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1240);
    };

    // 컴포넌트가 처음 마운트 될 때와 창 크기 변화 시에 실행
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);
  return (
    <>
      {isMobile ? (
        <>
          <Header
            title={user ? `${user.user_metadata.nickname}님만의` : '여러분만의'}
            content="맛집, 여행지를 공유해주세요!"
          />
          <Main />
        </>
      ) : (
        <WebMainPage />
      )}
    </>
  );
}
export default Home;
