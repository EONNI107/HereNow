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
  const [location, setLocation] = useState('');
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
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('FeedImage')
        .upload(fileName, image);

      if (uploadError) {
        console.error('Upload Error:', uploadError);
        alert('이미지 업로드에 실패하였습니다.');
        return;
      }

      const { data } = supabase.storage
        .from('FeedImage')
        .getPublicUrl(fileName);
      imageUrls.push(data.publicUrl);
    }

    const { error } = await supabase.from('posts').insert({
      title,
      location,
      content,
      image_urls: imageUrls,
      user_id: userId,
    });

    if (error) {
      console.error('Insert Post Error:', error);
      alert('피드 작성에 실패하였습니다.');
    } else {
      alert('피드가 성공적으로 업데이트되었습니다.');
      router.push('/');
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
          <LocationButton location={location} setLocation={setLocation} />
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
