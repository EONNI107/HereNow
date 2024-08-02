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
    <div className="sign-in-container">
      <h2>로그인 페이지</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <Link href="/sign-up">회원가입</Link>
      <br />
      <button type="button" onClick={() => signInWithOAuth('google')}>
        구글
      </button>
      <br />
      <button type="button" onClick={() => signInWithOAuth('kakao')}>
        카카오
      </button>
    </div>
  );
}

export default SignInPage;
