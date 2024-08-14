import React from 'react';
import LocalItemList from './Sections/LocalItemList';
import WebFeedSection from './Sections/WebFeedSection';
import LocalSection from './Sections/LocalSection';
import CheckLoginUser from './Sections/CheckLoginUser';

function Main() {
  return (
    <main className="flex flex-col w-full bg-gray0">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
      <CheckLoginUser />
    </main>
  );
}
export default Main;
