'use client';
import useAuthStore from '@/zustand/useAuthStore';

function UserName() {
  const { user } = useAuthStore();
  return <div>{user ? `${user.nickname}님만의 맛집과` : '여러분만의'}</div>;
}

export default UserName;
