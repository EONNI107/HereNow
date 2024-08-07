import React, { PropsWithChildren } from 'react';
import WebHeader from './_componets/WebHeader';

function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <WebHeader />
      {children}
    </div>
  );
}

export default layout;
