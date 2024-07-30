'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import InputField from '@/components/FeedWrite/InputField';
import LocationButton from '@/components/FeedWrite/LocationButton';
import ImageUpload from '@/components/FeedWrite/ImageUpload';
import TextArea from '@/components/FeedWrite/TextArea';

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

    const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa'; // 임시 사용자 ID

    let imageUrls: string[] = [];
    for (const image of images) {
      const fileName = `${Date.now()}_${image.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
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

    const { data, error } = await supabase
      .from('Feeds')
      .insert({
        userId,
        title,
        content,
        image: imageUrls,
        region,
        sigungu,
        createdAt: new Date(),
      })
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
    <div className="container mx-auto p-4">
      <div className="header flex justify-between mb-4">
        <button onClick={() => router.back()} className="btn">
          뒤로가기
        </button>
        <button onClick={handleSubmit} className="btn">
          등록
        </button>
      </div>
      <div className="body flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <InputField value={title} onChange={setTitle} placeholder="제목" />
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
          <TextArea
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
