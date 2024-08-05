'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import LocationButton from '@/components/FeedWrite/LocationButton';
import ImageUpload from '@/components/FeedWrite/ImageUpload';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import ContentInput from '@/components/FeedWrite/ContentInput';
import TitleInput from '@/components/FeedWrite/TitleInput';
import { toast } from 'react-toastify';

function FeedWrite() {
  const [title, setTitle] = useState<string>(''); // UseState 타입 정의
  const [region, setRegion] = useState<string>(''); // UseState 타입 정의
  const [sigungu, setSigungu] = useState<string>(''); // UseState 타입 정의
  const [content, setContent] = useState<string>(''); // UseState 타입 정의
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const router = useRouter();
  const supabase = createClient();
  const params = useSearchParams();

  useEffect(() => {
    const postId = params.get('id');
    if (postId) {
      const fetchPostData = async () => {
        const { data, error } = await supabase
          .from('Feeds')
          .select('*')
          .eq('id', postId)
          .single();

        if (data) {
          setTitle(data.title || ''); // null 값을 대비하여 빈 문자열을 기본값으로 설정
          setContent(data.content || ''); // null 값을 대비하여 빈 문자열을 기본값으로 설정
          setRegion(data.region || ''); // null 값을 대비하여 빈 문자열을 기본값으로 설정
          setSigungu(data.sigungu || ''); // null 값을 대비하여 빈 문자열을 기본값으로 설정
          setImagePreviews(data.image ? JSON.parse(data.image) : []);
        } else {
          console.error('Error fetching post data:', error);
        }
      };

      fetchPostData();
    }
  }, [params, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = '2596d4ff-f4e9-4875-a67c-22abc5fdacfa';

    let imageUrls = imagePreviews.slice();
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

    const postId = params.get('id');
    if (postId) {
      // 수정 시
      const { error } = await supabase
        .from('Feeds')
        .update({
          title,
          content,
          image: imageUrlsString,
          region,
          sigungu,
        })
        .eq('id', postId);

      if (error) {
        console.error('Update Post Error:', error);
        toast.error('피드 수정에 실패하였습니다.');
      } else {
        toast.success('피드가 성공적으로 수정되었습니다.');
        router.push(`/feed-detail/${postId}`);
      }
    } else {
      // 새로 작성 시
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
        toast.error('피드 작성에 실패하였습니다.');
      } else {
        toast.success('피드가 성공적으로 작성되었습니다.');
        const newFeedId = data[0].id;
        router.push(`/feed-detail/${newFeedId}`);
      }
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
