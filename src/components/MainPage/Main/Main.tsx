import React from 'react';
import LocalItemList from './section/LocalItemList';
import WebFeedSection from './section/WebFeedSection';
import LocalSection from './section/LocalSection';

function Main() {
  return (
    <main className="flex flex-col w-full">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
    </main>
  );
}
export default Main;
