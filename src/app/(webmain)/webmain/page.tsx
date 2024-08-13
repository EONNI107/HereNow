import React from 'react';
import LocalCategory from '../_componets/LocalCategory';
import AroundLocalList from '../_componets/AroundLocalList';
import LocalFeedList from '../_componets/LocalFeedList';
import MainBanner from '../_componets/MainBanner';

function WebMainPage() {
  return (
    <div className="w-full flex flex-col items-center gap-y-9">
      {/* 메인배너이미지 */}
      <MainBanner />
      <div className="w-full max-w-[1240px] flex flex-col mx-[340px] gap-y-[96px]">
        {/* 지역목록스와이퍼 */}
        <LocalCategory />
        {/* 피드목록 */}
        <LocalFeedList />
        {/* 내주변 로컬목록 */}
        <AroundLocalList />
      </div>
    </div>
  );
}

export default WebMainPage;
