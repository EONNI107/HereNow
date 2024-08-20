'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import LocationButton from '@/components/FeedWrite/LocationButton';
import ImageUpload from '@/components/FeedWrite/ImageUpload';
import ContentInput from '@/components/FeedWrite/ContentInput';
import TitleInput from '@/components/FeedWrite/TitleInput';
import useAuthStore from '@/zustand/useAuthStore';
import { toast } from 'react-toastify';
import { showToast } from '@/utils/toastHelper';

const supabase = createClient();

function FeedWrite() {
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);
  const [feedId, setFeedId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const router = useRouter();
  const { user } = useAuthStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const content = searchParams.get('content');
    const region = searchParams.get('region');
    const sigungu = searchParams.get('sigungu');
    const image = searchParams.get('image');

    if (id) setFeedId(id);
    if (title) setTitle(title);
    if (content) setContent(content);
    if (region) setRegion(region);
    if (sigungu) setSigungu(sigungu);
    if (image) {
      const existingImages = JSON.parse(image);
      setExistingImageUrls(existingImages);
      setImagePreviews(existingImages);
    }

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchParams]);

  const handleImageDelete = (index: number) => {
    const imageUrlToDelete = imagePreviews[index];

    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
    setDeletedImageUrls((prev) => [...prev, imageUrlToDelete]);
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !content ||
      !region ||
      (!images.length && !existingImageUrls.length)
    ) {
      return showToast(
        'warning',
        '제목과 내용, 지역 선택, 그리고 이미지를 첨부해주세요.',
      );
    }

    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const userId = user.id;

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

    const allImageUrls = [...existingImageUrls, ...imageUrls];
    const imageUrlsString =
      allImageUrls.length === 0 ? null : JSON.stringify(allImageUrls);

    if (feedId) {
      const { error } = await supabase
        .from('Feeds')
        .update({
          title,
          content,
          image: imageUrlsString,
          region,
          sigungu,
        })
        .eq('id', feedId);

      if (error) {
        console.error('Update Post Error:', error);
        alert('피드 수정에 실패하였습니다.');
      } else {
        toast.success('피드가 성공적으로 수정되었습니다.');
        router.replace(`/feed-detail/${feedId}`);
      }
    } else {
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
        toast.success('피드가 성공적으로 작성되었습니다.');
        const newFeedId = data[0].id;
        router.replace(`/feed-detail/${newFeedId}`);
      }
    }
  };

  return (
    <div>
      <div className="header flex justify-between items-center px-2 w-full h-12 xl:h-[4.2vw] xl:px-[17vw]">
        {isDesktop ? (
          <p
            onClick={() => {
              router.push('/');
            }}
            className="font-['양진체'] text-blue4 text-xl cursor-pointer"
          >
            지금,여기
          </p>
        ) : (
          <ChevronLeftIcon
            onClick={() => router.back()}
            className="btn h-5 w-5 ml-2 cursor-pointer"
          />
        )}
        <button
          onClick={handleSubmit}
          className="btn bg-blue4 px-2.5 py-1.5 w-15 h-9 rounded-lg font-semibold text-sm text-white xl:w-[6vw] xl:h-[2.7vw] xl:text-[1.3vw] hover:bg-blue5 hover:text-white transition-colors duration-300"
        >
          {feedId ? '수정하기' : '등록'}
        </button>
      </div>
      <div className="body flex flex-col bg-gray0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col m-4 xl:mx-[17.7vw]"
        >
          {isDesktop ? (
            <>
              <TitleInput
                value={title}
                onChange={setTitle}
                placeholder="제목"
              />
              <hr className="border-gray-300 border mb-[2.5vw]" />
              <div className="flex space-x-4 mb-4">
                <ImageUpload
                  images={images}
                  setImages={setImages}
                  imagePreviews={imagePreviews}
                  setImagePreviews={setImagePreviews}
                  handleImageDelete={handleImageDelete}
                  isDesktop={isDesktop}
                />
                <LocationButton
                  region={region}
                  sigungu={sigungu}
                  setRegion={setRegion}
                  setSigungu={setSigungu}
                  isDesktop={isDesktop}
                />
              </div>
              <ContentInput
                value={content}
                onChange={setContent}
                placeholder="내용을 입력해주세요"
              />
            </>
          ) : (
            <>
              <TitleInput
                value={title}
                onChange={setTitle}
                placeholder="제목"
              />
              <hr className="border-gray-300 border mb-4" />
              <LocationButton
                region={region}
                sigungu={sigungu}
                setRegion={setRegion}
                setSigungu={setSigungu}
                isDesktop={isDesktop}
              />
              <ImageUpload
                images={images}
                setImages={setImages}
                imagePreviews={imagePreviews}
                setImagePreviews={setImagePreviews}
                handleImageDelete={handleImageDelete}
                isDesktop={isDesktop}
              />
              <ContentInput
                value={content}
                onChange={setContent}
                placeholder="내용을 입력해주세요"
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default FeedWrite;
