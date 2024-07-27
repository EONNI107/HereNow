import React from 'react';
import LocalItemList from './section/LocalItemList';
import WebFeedSection from './section/Webfeedsection';
import LocalSection from './section/Localsection';

export default function Main() {
  return (
    <main className="flex flex-col">
      <LocalItemList />
      <WebFeedSection />
      <LocalSection />
    </main>
  );
}
