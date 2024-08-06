'use client';

import { showToast } from '@/utils/toastHelper';
import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,20}$/;
    const englishRegex = /^[a-zA-Z]{0,2}$/;
    return nicknameRegex.test(nickname) && !englishRegex.test(nickname);
  };

  useEffect(() => {
    const isValid =
      isValidEmail(email) &&
      isValidPassword(password) &&
      password === passwordConfirm &&
      isValidNickname(nickname);
    setIsFormValid(isValid);
  }, [email, password, passwordConfirm, nickname]);

  const handleEmailBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      showToast('error', '이메일을 입력하세요');
    } else if (!isValidEmail(e.target.value)) {
      showToast('error', '올바른 이메일 형식이 아닙니다');
    }
  };

  const handlePasswordBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      showToast('error', '비밀번호를 입력하세요');
    } else if (!isValidPassword(e.target.value)) {
      showToast(
        'error',
        '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다',
      );
    }
  };

  const handlePasswordConfirmBlur = () => {
    if (passwordConfirm === '') {
      showToast('error', `비밀번호를 입력하세요`);
    } else if (password !== passwordConfirm) {
      showToast('error', `비밀번호가 같지 않습니다`);
    }
  };

  const handleNicknameBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      showToast('error', `닉네임을 입력해주세요`);
    } else if (!isValidNickname(e.target.value)) {
      showToast(
        'error',
        '닉네임은 2~20자의 한글, 영문, 숫자만 사용 가능합니다',
      );
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
    if (!isFormValid) {
      showToast('error', '모든 필드를 올바르게 입력해주세요');
      return;
    }
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
      <h2 className="text-2xl font-bold mb-6 w-full max-w-md pt-10 p-6">
        계정을 생성해주세요
      </h2>
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              className="block text-base font-bold text-gray12 mb-1"
              htmlFor="email"
            >
              아이디(이메일)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              className="w-full px-3 py-2 border border-gray3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue4"
              placeholder="ex)email@naver.com"
              onChange={onChangeEmail}
              onBlur={handleEmailBlur}
            />
          </div>
          <div>
            <label
              className="block text-base font-bold text-gray12 mb-1"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              onBlur={handlePasswordBlur}
              id="password"
              type="password"
              value={password}
              className="w-full px-3 py-2 border border-gray3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue4"
              placeholder="영문 • 숫자 • 특수문자 | 8자 이상"
              onChange={onChangePassword}
            />
          </div>
          <div>
            <label
              className="block text-base font-bold text-gray12 mb-1"
              htmlFor="passwordConfirm"
            >
              비밀번호 확인
            </label>
            <input
              onBlur={handlePasswordConfirmBlur}
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              className="w-full px-3 py-2 border border-gray3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue4"
              placeholder="영문 • 숫자 • 특수문자 | 8자 이상"
              onChange={onChangePasswordConfirm}
            />
          </div>
          <div>
            <label
              className="block text-base font-bold text-gray12 mb-1"
              htmlFor="nickname"
            >
              닉네임
            </label>
            <input
              onBlur={handleNicknameBlur}
              id="nickname"
              type="text"
              value={nickname}
              className="w-full px-3 py-2 border border-gray3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue4"
              placeholder="2~20자의 한글, 영문, 숫자"
              onChange={onChangeNickname}
            />
          </div>
          <div className="pt-24">
            <button
              disabled={!isFormValid || isSubmitting}
              type="submit"
              className={`w-full py-3 px-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isFormValid ? 'bg-blue4 text-white' : 'bg-gray3 text-white '
              }`}
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
