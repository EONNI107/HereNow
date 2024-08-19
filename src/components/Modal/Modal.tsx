'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { create } from 'zustand';
import { Cookies, useCookies } from 'react-cookie';
import { showToast } from '@/utils/toastHelper';

type ModalProps = {
  isShow: boolean;
  SetShow: (state: boolean) => void;
  isGetPosition: boolean;
  SetIsGetPosition: (state: boolean) => void;
};
export const useModal = create<ModalProps>((set) => {
  return {
    isShow: false,
    isGetPosition: false,
    SetShow: (state: boolean) => set({ isShow: state }),
    SetIsGetPosition: (state: boolean) => set({ isGetPosition: state }),
  };
});

function Modal() {
  const [cookies, setCookies] = useCookies();
  const { isShow, SetShow, SetIsGetPosition } = useModal();
  const getExpiredDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const closeModalUntilExpires = () => {
    const expires = getExpiredDate(1);
    setCookies('MODAL_EXPIRES', true, { path: '/', expires });
    if (confirm('위치를 승인하시겠습니까?')) {
      const expires = getExpiredDate(1);
      setCookies('MODAL_LOCATION', true, { path: '/', expires });
      SetShow(false);
      SetIsGetPosition(true);
    } else {
      SetShow(false);
      SetIsGetPosition(false);
      showToast('info', '위치승인 거부하였습니다.');
    }
  };
  useEffect(() => {
    if (cookies['MODAL_LOCATION'] && cookies['MODAL_EXPIRES'])
      return SetShow(false);
    SetShow(true);
  }, []);

  const confirmShow = () => {
    if (confirm('위치를 승인하시겠습니까?')) {
      SetShow(false);
      SetIsGetPosition(true);
    } else {
      SetShow(false);
      SetIsGetPosition(false);
      showToast('info', '위치승인 거부하였습니다.');
    }
  };
  return (
    <>
      <div>
        {isShow && (
          <div className="rounded-t-3xl fixed top-[50%] left-[50%] z-30 max-w-[400px] w-[90%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-auto h-auto">
              <Image
                src="/Pop-Up.png"
                alt="팝업"
                width={736}
                height={828}
                className="rounded-t-3xl object-cover w-full h-full"
                priority
              />
            </div>
            <div className="w-full h-full flex justify-between bg-white px-8 py-4 rounded-b-3xl max-md:text-[12px] max-md:px-4 max-md:py-3">
              <button onClick={closeModalUntilExpires} className="shrink-0">
                오늘은 그만 볼래요
              </button>
              <button className="shrink-0" onClick={confirmShow}>
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        className={`${
          !isShow
            ? 'hidden'
            : 'bg-black/[0.25] fixed inset-0 z-20 flex justify-center items-center'
        }`}
      ></div>
    </>
  );
}

export default Modal;
