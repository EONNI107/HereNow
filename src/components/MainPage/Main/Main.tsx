import React from 'react';
import LocalItemList from './Section/LocalItemList';
import WebFeedSection from './Section/WebFeedSection';
import LocalSection from './Section/LocalSection';

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
