import React, { PropsWithChildren } from 'react';
import WebHeader from './_componets/WebHeader';
import WebFooter from './_componets/WebFooter';

function layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full">
      <WebHeader />
      <div className="w-full pt-[76px] pb-[110px] mx-auto"> {children}</div>
      <WebFooter />
    </div>
  );
}

export default layout;
