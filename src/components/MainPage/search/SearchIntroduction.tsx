import Image from 'next/image';
import React from 'react';

type introductionProps = {
  searchValue?: string;
  isIntroduce?: boolean;
};
function SearchIntroduction({
  searchValue,
  isIntroduce = true,
}: introductionProps) {
  return (
    <div className="w-full px-4 py-2 rounded-lg bg-orange0 h-[72px]">
      {isIntroduce ? (
        <div className="w-full flex h-full gap-[7px]">
          <div className="flex w-[35px] h-[25px] items-center">
            <Image
              src="/Event.png"
              alt="행사아이콘"
              width={20}
              height={20}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg">로컬</h2>
            <p className="text-sm">
              {searchValue}의 가볼만한 곳을 찾아드릴게요!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex h-full gap-[7px]">
          <div className="flex w-[35px] h-[25px] items-center">
            <Image
              src="/Save.png"
              alt="피드아이콘"
              width={20}
              height={20}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-lg">피드</h2>
            <p className="text-sm">
              사람들끼리 공유한 모든 여행 꿀팁을 볼 수 있어요
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchIntroduction;
