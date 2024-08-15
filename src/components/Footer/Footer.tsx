'use client';
import useAuthStore from '@/zustand/useAuthStore';
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import LoginPrompt from '@/components/LoginPrompt';
import { toast } from 'react-toastify';
function Footer() {
  const { user } = useAuthStore();

  const handleLoginPrompt = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast(<LoginPrompt />, {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      });
      return;
    }
  };

  return (
    <footer className="bg-white fixed z-10 right-0 p-1 w-full h-[72px] bottom-0 mx-auto">
      <div className="flex justify-between items-center h-full px-5">
        <Link
          href={'/'}
          className="w-[70px] h-[44px] flex flex-col items-center"
        >
          <HomeIcon className="w-5 h-5" />
          <p>홈</p>
        </Link>
        <Link
          href={'/feed'}
          className="w-[70px] h-[44px] flex flex-col items-center"
        >
          <Squares2X2Icon className="w-5 h-5" />
          <p>피드</p>
        </Link>
        {user ? (
          <Link
            href={`/profile/${user.id}`}
            className="w-[70px] h-[44px] flex flex-col items-center"
          >
            <UserIcon className="w-5 h-5" />
            <p>마이페이지</p>
          </Link>
        ) : (
          <button
            onClick={handleLoginPrompt}
            className="w-[70px] h-[44px] flex flex-col items-center"
          >
            <UserIcon className="w-5 h-5" />
            <p>마이페이지</p>
          </button>
        )}
      </div>
    </footer>
  );
}
export default Footer;
