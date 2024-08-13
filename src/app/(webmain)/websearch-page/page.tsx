import React from 'react';

import WebSearch from '../_componets/WebSearch';
import WebFeedSearchItem from '../_componets/WebFeedSearchItem';

function WebSearchPage() {
  return (
    <div className="flex flex-col max-w-[1240px] mx-auto pt-[80px] gap-y-[160px]">
      <WebSearch />
      <WebFeedSearchItem />
    </div>
  );
}

export default WebSearchPage;
