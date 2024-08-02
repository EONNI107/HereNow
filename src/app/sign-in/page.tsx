'use client';

import { FormEvent, useRef } from 'react';
import { showToast } from '@/utils/toastHelper';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/zustand/useAuthStore';

function SignInPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return showToast('error', '모든 항목을 입력해주세요');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast('error', error.message);
      return;
    }
    setUser(data.user);
    showToast('success', '로그인 성공');
    router.push('/');
  };

  const signInWithOAuth = async (provider: 'google' | 'kakao') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options:
        provider === 'google'
          ? {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
            }
          : {},
    });
    if (error) {
      showToast('error', error.message);
      return;
    }
    showToast('success', `${provider}로 로그인 성공`);
    router.push('/');
  };

  return (
    <div
      className="min-h-screen flex flex-col  items-center p-4 pt-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1822247032/ko/%EC%82%AC%EC%A7%84/%EA%B0%80%EC%9D%84-%EC%8A%A4%EC%9C%84%EC%8A%A4-%EC%95%8C%ED%94%84%EC%8A%A4%EC%9D%98-%EA%B5%AC%EB%B6%88%EA%B5%AC%EB%B6%88%ED%95%9C-%EB%8F%84%EB%A1%9C%EC%9D%98-%EC%A1%B0%EA%B0%90%EB%8F%84.jpg?s=1024x1024&w=is&k=20&c=_wvxcmCMESdovQcIjvuh78JlBsUcKMv2t0-PMCfrKYs=')",
      }}
    >
      <div className="w-full">
        <p className="text-sm text-gray-600 mb-4 text-center">
          찐 로컬들의 여행, 맛집 공유 앱
        </p>
        <h5 className="text-2xl font-bold mb-6 text-center  text-gray-800">
          지금, 여기
        </h5>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              ref={emailRef}
              placeholder="아이디 (이메일)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-90"
            />
          </div>
          <div>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="비밀번호"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white bg-opacity-90"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-300"
          >
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/sign-up" className="text-sm text-blue-600">
            처음이신가요?
          </Link>
        </div>
        <div className="mt-6 flex flex-col space-y-2">
          <button
            type="button"
            onClick={() => signInWithOAuth('kakao')}
            className="w-full bg-yellow-300 text-black py-2 px-4 rounded-md hover:bg-yellow-400 flex items-center justify-center"
          >
            <span className="mr-2">카카오로 로그인</span>
          </button>
          <button
            type="button"
            onClick={() => signInWithOAuth('google')}
            className="w-full bg-white text-black py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
          >
            <span className="mr-2">구글로 로그인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
