'use client';
import Header from '@/components/MainPage/Header';
import Main from '@/components/MainPage/Main';
import useAuthStore from '@/zustand/useAuthStore';
function Home() {
  const { user } = useAuthStore();

  return (
    <>
      <Header
        title={`${user ? user.user_metadata.nickname : '홍길동님만의'}`}
        content="맛집,여행지를 공유해주세요"
      />
      <Main />
    </>
  );
}
export default Home;
