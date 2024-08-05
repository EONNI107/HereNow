import { PropsWithChildren, Suspense } from 'react';

function SearchLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}

export default SearchLayout;
