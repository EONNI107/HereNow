'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <h1 className="font-pretendard font-semibold text-[28px] mb-2">404</h1>
      <h2 className="font-pretendard font-medium text-[#505050] text-[20px] mb-4">
        ERROR
      </h2>
      <Image
        src={`/404.png`}
        alt="404이미지"
        width={150}
        height={150}
        priority={true}
        className="mb-4"
      />
      <div className="font-pretendard font-regular text-[#999999]">
        <p className="mb-1">요청하신 페이지를 찾을 수 없어요.</p>
        <p className="mb-6">주소가 올바른지 확인하시고, 다시 시도해 주세요.</p>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => router.back()}
          className="font-pretendard font-semibold bg-blue-500 text-white px-6 py-2 rounded-xl"
        >
          돌아가기
        </button>
        <Link
          href={'/'}
          className="font-pretendard font-semibold text-[#118DFF] border-[2px] border-[#118DFF] border-gray-300 px-6 py-2 rounded-xl"
        >
          메인으로
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
