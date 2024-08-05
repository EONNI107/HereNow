'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import LocationButton from '@/components/FeedWrite/LocationButton';
import ImageUpload from '@/components/FeedWrite/ImageUpload';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ContentInput from '@/components/FeedWrite/ContentInput';
import TitleInput from '@/components/FeedWrite/TitleInput';

function FeedWrite() {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa';

    let imageUrls: string[] = [];
    for (const image of images) {
      const fileName = `${Date.now()}_${image.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}`;
      const { error: uploadError } = await supabase.storage
        .from('FeedImage')
        .upload(fileName, image);

      if (uploadError) {
        console.error('Upload Error:', uploadError);
        alert('이미지 업로드에 실패하였습니다.');
        return;
      }

      const { publicUrl } = supabase.storage
        .from('FeedImage')
        .getPublicUrl(fileName).data;
      imageUrls.push(publicUrl);
    }

    const imageUrlsString = JSON.stringify(imageUrls);

    const { data, error } = await supabase
      .from('Feeds')
      .insert([
        {
          userId,
          title,
          content,
          image: imageUrlsString,
          region,
          sigungu,
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Insert Post Error:', error);
      alert('피드 작성에 실패하였습니다.');
    } else {
      alert('피드가 성공적으로 작성되었습니다.');
      const feedId = data[0].id;
      router.push(`/feed-detail/${feedId}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="header flex justify-between items-center mb-4">
        <ChevronLeftIcon
          onClick={() => router.back()}
          className="btn h-6 w-6 cursor-pointer"
        ></ChevronLeftIcon>
        <button
          onClick={handleSubmit}
          className="btn bg-blue-500 px-2 py-1 rounded-md font-semibold text-14px text-white"
        >
          등록
        </button>
      </div>
      <div className="body flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TitleInput value={title} onChange={setTitle} placeholder="제목" />
          <hr className="border-gray-300 border" />
          <LocationButton
            region={region}
            sigungu={sigungu}
            setRegion={setRegion}
            setSigungu={setSigungu}
          />
          <ImageUpload
            images={images}
            setImages={setImages}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
          <ContentInput
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해주세요"
          />
        </form>
      </div>
    </div>
  );
}

export default FeedWrite;
