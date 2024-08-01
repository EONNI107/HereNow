'use client';

import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import { ChangeEvent, useEffect, useState } from 'react';
import PenIcon from '@/components/IconList/PenIcon';
import Image from 'next/image';
import { Tables, TablesInsert } from '@/types/supabase';
import FeedsList from '@/components/FeedsList/FeedsList';
import FeedLikes from '@/components/FeedLikesList/FeedLikesList';
import PlaceLikes from '@/components/PlaceLikes/PlaceLikes';
import useAuthStore from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';

type EditProfile = Pick<TablesInsert<'Users'>, 'nickname' | 'profileImage'>;

function MyPage() {
  const { user } = useAuthStore();
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState<Tables<'Users'>>();
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<EditProfile>();
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    'feedsList' | 'feedLikes' | 'placeLikes'
  >('feedsList');

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      showToast('error', `프로필 정보 불러오는 중에 오류가 발생했습니다`);
      console.log(error.message);
      return null;
    }
    return data;
  };

  const fetchProfile = async () => {
    if (user) {
      const profileData = await fetchUserProfile(user.id);
      if (profileData) {
        setProfile(profileData);
        setEditProfile({
          nickname: profileData.nickname,
          profileImage: profileData.profileImage,
        });
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
      } catch (error) {
        showToast(
          'error',
          `${
            selectedTab === 'feedsList'
              ? '작성한 글'
              : selectedTab === 'feedLikes'
              ? '찜한 글'
              : '찜한 장소'
          } 불러오기 에러`,
        );
      }
      setLoading(false);
    };

    fetchPosts();
  }, [selectedTab]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('profileImage')
      .upload(`avatar_${Date.now()}.png`, file);

    if (error) {
      showToast('error', `이미지 업로드 중 오류가 발생했습니다`);
      console.log(error.message);
      return null;
    }

    return data.path;
  };

  const handleUpdate = async () => {
    if (user) {
      let imagePath = profile?.profileImage;

      if (newImageFile) {
        const path = await uploadImage(newImageFile);
        if (path) {
          imagePath = `https://cuxcqeqwbwfuxipnozwy.supabase.co/storage/v1/object/public/profileImage/${path}`;
        }
      }
      //쥬스탠드 업데이트 기능 추가
      const { error } = await supabase
        .from('Users')
        .update({
          nickname: editProfile?.nickname,
          profileImage: imagePath,
        })
        .eq('id', user.id);

      if (error) {
        showToast('error', `프로필 파일 업로드중 오류가 발생했습니다`);
        console.log(error.message);
      } else {
        setProfile((prev) => {
          return {
            ...prev,
            nickname: editProfile?.nickname,
            profileImage: imagePath,
          } as Tables<'Users'>;
        });
        setIsEditing(false);
        showToast('success', '프로필 수정이 완료되었습니다.');
      }
    }
  };

  return (
    <div className="pt-10 flex flex-col h-svh">
      <div
        className={`flex items-center rounded-2xl w-full h-28 ${
          user ? 'bg-[#DBEEFF]' : 'bg-[#FFF4F0]'
        }`}
      >
        <div className="relative flex items-center w-full justify-between p-5">
          <Image
            src={
              imagePreview ||
              profile?.profileImage ||
              'https://via.placeholder.com/150'
            }
            className="h-16 w-16 rounded-full"
            alt="Profile"
            width={64}
            height={64}
          />
          {!user && (
            <a href="/sign-in">
              <button className="ml-4 p-2 bg-[#FD8B59] text-white rounded-xl">
                로그인 · 회원가입하러가기
              </button>
            </a>
          )}
          {user && isEditing && (
            <div>
              <label
                htmlFor="file-input"
                className="absolute bottom-6 right-11 cursor-pointer"
              >
                <PenIcon />
              </label>
              <input
                type="file"
                id="file-input"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}
        </div>
        <div>
          {user && !isEditing && (
            <div>
              <div className="mt-5 mr-6">{profile?.email}</div>
              <div className="mb-5">{profile?.nickname}</div>
            </div>
          )}
          {user && isEditing && (
            <div>
              <div className="mt-5 mr-8">{profile?.email}</div>
              <div className="mb-5">
                <input
                  type="text"
                  value={editProfile?.nickname}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      nickname: e.target.value,
                    })
                  }
                  className="p-1 border rounded w-28"
                />
              </div>
            </div>
          )}
        </div>
        {user && (
          <div>
            {isEditing ? (
              <div className="flex flex-col space-y-2">
                <div className="flex justify-end">
                  <button
                    onClick={handleUpdate}
                    className="m-2 w-24 rounded-md bg-sky-500 text-white"
                  >
                    수정 완료
                  </button>
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="m-2 w-24 rounded-md bg-gray-500 text-white"
                >
                  취소
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-10 ml-5 w-24 rounded-md bg-sky-500 text-white"
                >
                  프로필 수정
                </button>
                <button
                  onClick={() => {
                    useAuthStore.getState().logOut();
                    showToast('success', '로그아웃이 완료 되었습니다');
                    router.push('/sign-in');
                  }}
                  className="m-5 mb-10 w-24 rounded-md bg-[#FD8B59] text-white"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center w-full mt-6">
        <button
          className={`p-2 flex-1 ${
            selectedTab === 'feedsList'
              ? 'bg-white text-black border-b-4 border-[#118DFF]'
              : 'text-gray-400 border-b-4 border-b-white'
          }`}
          onClick={() => setSelectedTab('feedsList')}
        >
          작성한 글
        </button>
        <button
          className={`p-2 flex-1 ${
            selectedTab === 'feedLikes'
              ? 'bg-white text-black border-b-4 border-[#118DFF]'
              : 'text-gray-400 border-b-4 border-b-white'
          }`}
          onClick={() => setSelectedTab('feedLikes')}
        >
          찜한 글
        </button>
        <button
          className={`p-2 flex-1 ${
            selectedTab === 'placeLikes'
              ? 'bg-white text-black border-b-4 border-[#118DFF]'
              : 'text-gray-400 border-b-4 border-b-white'
          }`}
          onClick={() => setSelectedTab('placeLikes')}
        >
          찜한 장소
        </button>
      </div>

      <div className="flex flex-1 justify-center bg-gray-50 px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {selectedTab === 'feedsList' && <FeedsList />}
            {selectedTab === 'feedLikes' && <FeedLikes />}
            {selectedTab === 'placeLikes' && <PlaceLikes />}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
