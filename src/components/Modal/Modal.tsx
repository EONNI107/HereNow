'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { create } from 'zustand';
import { useCookies } from 'react-cookie';
type ModalProps = {
  isShow: boolean;
  SetShow: (state: boolean) => void;
};
export const useModal = create<ModalProps>((set) => {
  return {
    isShow: false,
    SetShow: (state: boolean) => set({ isShow: state }),
  };
});

function Modal() {
  const [cookies, setCookies] = useCookies();
  const { isShow, SetShow } = useModal();
  console.log(cookies);
  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const closeModalUntilExpires = () => {
    const expires = getExpiredDate(3);
    setCookies('MODAL_EXPIRES', true, { path: '/', expires });
    SetShow(false);
  };
  useEffect(() => {
    if (cookies['MODAL_EXPIRES']) return SetShow(false);
    SetShow(true);
  }, []);
  return (
    <>
      <div>
        {isShow && (
          <div className="rounded-t-3xl absolute right-[26%] top-[80%] z-10 max-w-[1920px]">
            <div className="max-w-[736px] max-h-[828px]">
              <Image
                src="/Pop-Up.png"
                alt="팝업"
                width={736}
                height={828}
                className="rounded-t-3xl object-cover w-full h-full"
                priority
              />
            </div>
            <div className="w-full h-full flex justify-between bg-white px-8 py-4 rounded-b-3xl">
              <button onClick={closeModalUntilExpires}>
                오늘은 그만 볼래요
              </button>
              <button onClick={() => SetShow(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          !isShow ? 'hidden' : 'bg-black/[0.25] fixed w-full h-screen z-9'
        }`}
      ></div>
    </>
  );
}

export default Modal;
