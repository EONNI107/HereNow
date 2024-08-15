'use client';
import dynamic from 'next/dynamic';
const SearchMain = dynamic(() => import('@/components/SearchMain/SearchMain'), {
  ssr: false,
});
function SeachDetailPage() {
  return <SearchMain />;
}
export default SeachDetailPage;
