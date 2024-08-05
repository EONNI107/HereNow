'use client';

import { showToast } from '@/utils/toastHelper';
import React, { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      showToast('error', `비밀번호를 입력하세요`);
    } else if (e.target.value.length < 6) {
      showToast('error', '비밀번호는 최소 6글자입니다');
    }
  };

  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm === '') {
      showToast('error', `비밀번호를 입력하세요`);
    } else if (password !== passwordConfirm) {
      showToast('error', `비밀번호가 같지 않습니다`);
    } else if (password === passwordConfirm) {
      showToast('success', `비밀번호가 일치합니다`);
    }
  };

  const handleNicknameBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      showToast('error', `닉네임을 입력해주세요`);
    } else if (e.target.value.length < 2) {
      showToast('error', '닉네임은 최소 2글자입니다');
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirm(e.target.value);
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/sign-up', {
        email,
        password,
        nickname,
      });
      if (response.status === 201) {
        showToast('success', `회원가입이 성공했습니다`);
        router.push('/sign-in');
      }
    } catch (error) {
      showToast('error', `회원가입에 실패했습니다`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full grid place-items-center">
      <h2 className="text-2xl font-bold mb-6  w-full max-w-md pt-32 p-6">
        계정을 생성해주세요
      </h2>
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              아이디 (이메일)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="이메일을 입력하세요"
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              onBlur={handlePasswordBlur}
              id="password"
              type="password"
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="passwordConfirm"
            >
              비밀번호 확인
            </label>
            <input
              onBlur={handlePasswordConfirmBlur}
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 다시 입력하세요"
              onChange={onChangePasswordConfirm}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              onBlur={handleNicknameBlur}
              id="nickname"
              type="text"
              value={nickname}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="닉네임을 입력하세요"
              onChange={onChangeNickname}
            />
          </div>
          <div className="pt-32">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#118DFF] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
