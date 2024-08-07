import React from 'react';
import LocalItemList from './Sections/LocalItemList';
import WebFeedSection from './Sections/WebFeedSection';
import LocalSection from './Sections/LocalSection';

function Main() {
  return (
    <main className="flex flex-col w-full bg-gray0">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
    </main>
  );
}
export default Main;
