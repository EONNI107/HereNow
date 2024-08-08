'use client';

import { FormEvent, useRef } from 'react';
import { showToast } from '@/utils/toastHelper';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/zustand/useAuthStore';
import Image from 'next/image';
import axios from 'axios';

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

    try {
      const response = await axios.post('/api/sign-in', { email, password });

      setUser(response.data);
      showToast('success', '로그인 성공');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      showToast('error', '로그인에 실패했습니다');
    }
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
    <div className="fixed inset-0 flex items-start justify-center overflow-hidden">
      <div className="relative w-full max-w-md h-full">
        <Image
          src="/LoginPage.jpg"
          alt="로그인 배경화면"
          layout="fill"
          objectFit="cover"
          className="z-[-1]"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center overflow-y-auto sm:pt-8">
          <div
            className="w-full max-w-md px-4 py-4 sm:py-8 flex flex-col"
            style={{ minHeight: '70vh' }}
          >
            <div className="">
              <div className="text-center mb-8">
                <p className="text-xs sm:text-sm mb-2 font-semibold text-white">
                  찐 로컬들의 여행, 맛집 공유 앱
                </p>
                <p className="text-3xl sm:text-4xl text-white font-[양진체]">
                  지금, 여기
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-white text-sm">아이디(이메일)</label>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    placeholder="ex)email@naver.com"
                    className="w-full px-4 py-3 sm:py-4 border border-blue0 rounded-lg bg-transparent text-white placeholder-gray3 text-base"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">비밀번호</label>
                  <input
                    ref={passwordRef}
                    type="password"
                    id="password"
                    placeholder="*******"
                    className="w-full px-4 py-3 sm:py-4 border border-blue0 rounded-lg bg-transparent text-white placeholder-gray3 text-base"
                  />
                </div>
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-blue4 text-white py-4 sm:py-5 px-6 rounded-2xl hover:bg-gray3 text-sm sm:text-base"
                  >
                    로그인
                  </button>
                  <button
                    type="button"
                    className="w-full bg-blue4 text-white py-4 sm:py-5 px-6 rounded-2xl hover:bg-gray3 text-sm sm:text-base"
                    onClick={() => {
                      router.push('/');
                    }}
                  >
                    메인페이지로
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col justify-between flex-grow mt-8">
              <div className="text-center">
                <Link
                  href="/sign-up"
                  className="text-sm sm:text-base text-white underline underline-offset-2 decoration-1"
                >
                  처음이신가요?
                </Link>
              </div>

              {/* -----------------소셜 로그인 기능 잠시 보류------------------------- */}

              {/* <div className="mt-auto">
                <div className="flex items-center justify-center text-center mb-6">
                  <div className="flex-grow border-t-2 border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-xs sm:text-sm text-white font-semibold px-2">
                    SNS계정으로 로그인하기
                  </span>
                  <div className="flex-grow border-t-2 border-gray-300"></div>
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-3">
                  <button
                    type="button"
                    onClick={() => signInWithOAuth('kakao')}
                    className="w-full bg-[#F9E006] font-bold text-black py-3 sm:py-4 px-4 rounded-md hover:bg-yellow-400 flex items-center justify-center text-sm"
                  >
                    <Image
                      src="/kakao_symbol.jpg"
                      alt="Kakao"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2">카카오로 로그인</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => signInWithOAuth('google')}
                    className="w-full bg-white font-bold text-black py-3 sm:py-4 px-4 rounded-md border border-gray3 hover:bg-gray-100 flex items-center justify-center text-sm"
                  >
                    <Image
                      src="/google_symbol.svg.jpg"
                      alt="Google"
                      width={24}
                      height={24}
                    />
                    <span className="ml-2">구글로 로그인</span>
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
