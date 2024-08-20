'use client';

import Footer from '@/components/Footer';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import SocialLogin from '@/components/SocialLogin/Sociallogin';
import React, { PropsWithChildren, Suspense } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <HeaderLayout />
      </Suspense>
      <div className="pt-[50px] pb-[84px] lg:pt-[86px]">{children}</div>
      <Footer />
      <SocialLogin />
    </>
  );
}

export default layout;
