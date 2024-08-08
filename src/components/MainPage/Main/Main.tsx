import React from 'react';
import LocalItemList from '@/components/MainPage/Main/Sections/LocalItemList';
import WebFeedSection from '@/components/MainPage/Main/Sections/WebFeedSection';
import LocalSection from '@/components/MainPage/Main/Sections/LocalSection';

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
