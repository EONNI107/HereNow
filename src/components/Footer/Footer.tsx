'use client';
import dynamic from 'next/dynamic';
const FooterMain = dynamic(() => import('../FooterMain/FooterMain'), {
  ssr: false,
});

function Footer() {
  return <FooterMain />;
}
export default Footer;
