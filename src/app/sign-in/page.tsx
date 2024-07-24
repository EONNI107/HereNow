'use client';

import { FormEvent, useRef } from 'react';
import { showToast } from '@/utils/toastHelper';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignInPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const supabse = createClient();
  const router = useRouter();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      return showToast('error', '모든 항목을 입력해주세요');
    }

    const { error } = await supabse.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      showToast('error', error.message);
      return;
    }
    showToast('success', '로그인 성공');
    router.push('/');
  };

  return (
    <div className="sign-in-container">
      <h2>로그인 페이지</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">이메일:</label>
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
      <button>구글</button>
      <br />
      <button>카카오</button>
    </div>
  );
}
export default SignInPage;
