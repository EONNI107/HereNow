'use client';
import dynamic from 'next/dynamic';
const HeaderMain = dynamic(() => import('../HeaderMain/HeaderMain'), {
  ssr: false,
});
function HeaderLayout() {
  return <HeaderMain />;
}
export default HeaderLayout;
