import React, { PropsWithChildren } from 'react';
import WebHeader from './_componets/WebHeader';
import WebFooter from './_componets/WebFooter';

function layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full">
      <WebHeader />
      <div className="pt-[78px] pb-[130px]"> {children}</div>
      <WebFooter />
    </div>
  );
}

export default layout;
