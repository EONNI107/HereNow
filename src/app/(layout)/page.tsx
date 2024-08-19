'use client';
import dynamic from 'next/dynamic';

const HomeMain = dynamic(() => import('@/components/HomeMain/HomeMain'), {
  ssr: false,
});

function Home() {
  return <HomeMain />;
}
export default Home;
