import React from 'react';
import LocalCategory from '../_componets/LocalCategory';
import AroundLocalList from '../_componets/AroundLocalList';
import LocalFeedList from '../_componets/LocalFeedList';
import MainBanner from '../_componets/MainBanner';

function WebMainPage() {
  return (
    <div className="w-full flex flex-col items-center gap-y-9 justify-center">
      <MainBanner />
      <div className="w-full max-w-[1240px] flex flex-col mx-[340px] gap-y-[96px] max-xl:px-16">
        <LocalCategory />
        <LocalFeedList />
        <AroundLocalList />
      </div>
    </div>
  );
}

export default WebMainPage;
