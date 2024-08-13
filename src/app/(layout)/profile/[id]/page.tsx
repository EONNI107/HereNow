'use client';

import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import { ChangeEvent, useEffect, useState } from 'react';
import PenIcon from '@/components/IconList/PenIcon';
import Image from 'next/image';
import { Tables, TablesInsert } from '@/types/supabase';
import FeedsList from '@/components/MypageFeedsList/FeedsList';
import FeedLikes from '@/components/MypageFeedLikesList/FeedLikesList';
import PlaceLikes from '@/components/MypagePlaceLikesList/PlaceLikes';
import useAuthStore from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type EditProfile = Pick<TablesInsert<'Users'>, 'nickname' | 'profileImage'>;

function MyPage({ params }: { params: { id: string } }) {
  const { user, setUser } = useAuthStore();
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

  const isMyPage = params.id === user?.id;

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      showToast('error', `프로필 정보 불러오는 중에 오류가 발생했습니다`);

      return null;
    }
    return data;
  };

  const fetchProfile = async () => {
    if (user) {
      const profileData = await fetchUserProfile(params.id);
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
  }, [user, params.id]);

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
    if (!user || !profile || !editProfile) return;

    let imagePath = profile.profileImage;

    if (newImageFile) {
      const path = await uploadImage(newImageFile);
      if (path) {
        imagePath = `https://cuxcqeqwbwfuxipnozwy.supabase.co/storage/v1/object/public/profileImage/${path}`;
      }
    }

    const { error: updateError } = await supabase
      .from('Users')
      .update({
        nickname: editProfile.nickname,
        profileImage: imagePath,
      })
      .eq('id', user.id);

    if (updateError) throw updateError;

    const { data, error: authError } = await supabase.auth.updateUser({
      data: {
        nickname: editProfile.nickname,
        profileImage: imagePath,
      },
    });

    if (authError) throw authError;

    setProfile({
      ...profile,
      nickname: editProfile.nickname || '',
      profileImage: imagePath,
    });

    setUser({
      ...user,
      nickname: editProfile.nickname || '',
      profileImage: imagePath,
    });

    setIsEditing(false);
    showToast('success', '프로필 수정이 완료되었습니다.');
  };

  const handleLogout = async () => {
    const response = await axios.post(`/api/sign-out`);
    if (response.status === 200) {
      useAuthStore.getState().logOut();

      showToast('success', '로그아웃이 완료 되었습니다');
      router.push('/sign-in');
    } else {
      showToast('error', '로그아웃 중 오류가 발생했습니다');
    }
  };

  return (
    <div className="pt-10 flex flex-col px-2">
      <div className="flex items-center rounded-2xl w-full h-28 bg-blue0">
        <div className="relative flex items-center w-full justify-between p-5">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={
                  imagePreview ||
                  profile?.profileImage ||
                  '/default-profile.jpg'
                }
                className="h-16 w-16 rounded-full"
                alt="Profile"
                width={200}
                height={200}
              />
              {isMyPage && isEditing && (
                <label
                  htmlFor="file-input"
                  className="absolute bottom-0 right-0 p-0.5 cursor-pointer bg-orange3 rounded-full"
                >
                  <PenIcon />
                </label>
              )}
              {isMyPage && (
                <input
                  type="file"
                  id="file-input"
                  onChange={handleImageChange}
                  className="hidden"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-sub1 px-1">{profile?.email}</div>
              {isMyPage && isEditing ? (
                <input
                  type="text"
                  value={editProfile?.nickname || ''}
                  onChange={(e) =>
                    setEditProfile({
                      ...editProfile,
                      nickname: e.target.value,
                    })
                  }
                  className="px-1 border border-gray12 rounded w-28 bg-blue0"
                />
              ) : (
                <div className="text-main px-1">{profile?.nickname}</div>
              )}
            </div>
          </div>
          {isMyPage && (
            <div className="flex flex-col items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="w-24 rounded-xl bg-blue4 text-white p-2 hover:bg-blue5"
                  >
                    수정 완료
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-24 rounded-xl border-2 border-blue4 bg-blue0 text-blue4 p-1 px-4 text-sm font-bold hover:bg-blue1"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-24 rounded-xl bg-blue4 text-white p-2 hover:bg-blue5"
                  >
                    프로필 수정
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-24 rounded-xl bg-orange3 text-white p-1 hover:bg-orange4"
                  >
                    로그아웃
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isMyPage ? (
        <div className="flex justify-center w-full mt-6">
          <button
            className={`p-2 flex-1 ${
              selectedTab === 'feedsList'
                ? 'bg-white text-black border-b-4 border-blue4'
                : 'text-gray3 border-b-4 border-b-white'
            }`}
            onClick={() => setSelectedTab('feedsList')}
          >
            <p>작성한 글</p>
          </button>
          <button
            className={`p-2 flex-1 ${
              selectedTab === 'feedLikes'
                ? 'bg-white text-black border-b-4 border-blue4'
                : 'text-gray3 border-b-4 border-b-white'
            }`}
            onClick={() => setSelectedTab('feedLikes')}
          >
            <p>찜한 글</p>
          </button>
          <button
            className={`p-2 flex-1 ${
              selectedTab === 'placeLikes'
                ? 'bg-white text-black border-b-4 border-blue4'
                : 'text-gray3 border-b-4 border-b-white'
            }`}
            onClick={() => setSelectedTab('placeLikes')}
          >
            <p>찜한 장소</p>
          </button>
        </div>
      ) : (
        <div className="flex justify-center w-full mt-6">
          <div className="flex justify-center w-11/12">
            <div className="p-2 w-full text-center bg-white text-black border-b-4 border-blue4">
              <p className="text-xl font-semibold">작성한 글</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 justify-center bg-gray0 px-4 min-h-[60vh]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {isMyPage ? (
              <>
                {selectedTab === 'feedsList' && (
                  <FeedsList userId={params.id} />
                )}
                {selectedTab === 'feedLikes' && <FeedLikes />}
                {selectedTab === 'placeLikes' && <PlaceLikes />}
              </>
            ) : (
              <FeedsList userId={params.id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
