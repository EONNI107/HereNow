import Footer from '@/components/Footer';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import React, { PropsWithChildren, Suspense } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <HeaderLayout />
      </Suspense>
      <div className="pt-[50px] pb-[84px]">{children}</div>
      <Footer />
    </>
  );
}

export default layout;
