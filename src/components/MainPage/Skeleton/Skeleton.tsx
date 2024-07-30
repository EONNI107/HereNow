import React from 'react';

type props = {
  width: string;
  height: string;
};
const Skeleton = ({ width, height }: props) => {
  return (
    <div
      className={`bg-gray-300 animate-pulse`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;
