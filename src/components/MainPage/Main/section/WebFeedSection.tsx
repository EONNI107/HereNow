import React from 'react';

function WebFeedSection() {
  return (
    <section className="flex flex-col gap-4 w-full px-4 py-4">
      <div className="flex justify-between">
        <h2>지금 뜨고 있는 피드</h2>
        <button>더보러가기</button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid gap-4 grid-cols-2 grid-rows-2 w-full">
          <div className="bg-[#000] w-full h-[150px]">1</div>
          <div className="bg-[#000] w-full h-[150px]">2</div>
          <div className="bg-[#000] w-full h-[150px]">3</div>
          <div className="bg-[#000] w-full h-[150px]">4</div>
        </div>
      </div>
    </section>
  );
}
export default WebFeedSection;
