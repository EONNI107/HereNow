import React from 'react';
import LocalItemList from './Section/LocalItemList';
import WebFeedSection from './Section/WebFeedSection';
import LocalSection from './Section/LocalSection';

export default function Main() {
  return (
    <main className="flex flex-col w-full">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
    </main>
  );
}
