import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Layoutheader from '@/components/Layoutheader';
import Main from '@/components/Main';

export default function Home() {
  return (
    <>
      <div className="pt-[25px] flex flex-col items-center justify-center max-w-[400px] mx-auto">
        <Header title="홍길동만의" content="맛집,여행지를 공유해주세요" />
        <Main />
      </div>
    </>
  );
}
