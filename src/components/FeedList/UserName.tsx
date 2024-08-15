'use client';
import useAuthStore from '@/zustand/useAuthStore';

function UserName() {
  const { user } = useAuthStore();
  return (
    <div>{user ? `${user.user_metadata.nickname}님만의` : '여러분만의'}</div>
  );
}

export default UserName;
