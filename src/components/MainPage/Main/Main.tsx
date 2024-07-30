import React from 'react';
import LocalItemList from './section/LocalItemList';
import WebFeedSection from './section/WebFeedSection';
import LocalSection from './section/LocalSection';

export default function Main() {
  return (
    <main className="flex flex-col w-full">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
    </main>
  );
}
