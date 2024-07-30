import Header from '@/components/MainPage/Header';
import Main from '@/components/MainPage/Main';

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
        <Header title="홍길동만의" content="맛집,여행지를 공유해주세요" />
        <Main />
      </div>
    </>
  );
}
export default Home;
