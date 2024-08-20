'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import Image from 'next/image';
import PenIcon from '@/components/IconList/PenIcon';
import FeedsList from '@/components/MypageFeedsList/FeedsList';
import FeedLikes from '@/components/MypageFeedLikesList/FeedLikesList';
import PlaceLikes from '@/components/MypagePlaceLikesList/PlaceLikes';
import useAuthStore from '@/zustand/useAuthStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { Tables, TablesInsert } from '@/types/supabase';

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
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [newNickname, setNewNickname] = useState('');

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
    const profileData = await fetchUserProfile(params.id);
    if (profileData) {
      setProfile(profileData);
      setEditProfile({
        nickname: profileData.nickname,
        profileImage: profileData.profileImage,
      });
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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);

      if (window.innerWidth >= 1280) {
        await handleImmediateImageUpdate(e.target.files[0]);
      }
    }
  };

  const handleImmediateImageUpdate = async (file: File) => {
    if (!user || !profile) return;

    const path = await uploadImage(file);
    if (path) {
      const imagePath = `https://cuxcqeqwbwfuxipnozwy.supabase.co/storage/v1/object/public/profileImage/${path}`;

      const { error: updateError } = await supabase
        .from('Users')
        .update({ profileImage: imagePath })
        .eq('id', user.id);

      if (updateError) {
        showToast('error', '프로필 이미지 업데이트 중 오류가 발생했습니다');
        return;
      }

      const { error: authError } = await supabase.auth.updateUser({
        data: { profileImage: imagePath },
      });

      if (authError) {
        showToast('error', '프로필 이미지 업데이트 중 오류가 발생했습니다');
        return;
      }

      setProfile({ ...profile, profileImage: imagePath });
      setUser({ ...user, profileImage: imagePath });
      showToast('success', '프로필 이미지가 업데이트되었습니다');
    }
  };

  const uploadImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from('profileImage')
      .upload(`avatar_${Date.now()}.png`, file);

    if (error) {
      showToast('error', `이미지 업로드 중 오류가 발생했습니다`);
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

  const handleNicknameEdit = () => {
    if (newNickname.length > 7) {
      showToast('error', '닉네임은 8글자 미만이어야 합니다.');
      return;
    }
    if (isEditingNickname) {
      handleNicknameUpdate();
    } else {
      setNewNickname(profile?.nickname || '');
      setIsEditingNickname(true);
    }
  };

  const handleNicknameUpdate = async () => {
    if (!user || !profile) return;

    const { error: updateError } = await supabase
      .from('Users')
      .update({ nickname: newNickname })
      .eq('id', user.id);

    if (updateError) {
      showToast('error', '닉네임 업데이트 중 오류가 발생했습니다');
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: { nickname: newNickname },
    });

    if (authError) {
      showToast('error', '닉네임 업데이트 중 오류가 발생했습니다');
      return;
    }

    setProfile({ ...profile, nickname: newNickname });
    setUser({ ...user, nickname: newNickname });
    setIsEditingNickname(false);
    showToast('success', '닉네임이 성공적으로 업데이트되었습니다');
  };

  const handleNicknameEditCancel = () => {
    setIsEditingNickname(false);
    setNewNickname(profile?.nickname || '');
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
    <div className="container xl:max-w-screen-xl mx-auto pt-10 flex flex-col px-2">
      <div className="w-full">
        <div className="xl:hidden flex items-center rounded-2xl w-full h-28 bg-blue-50">
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
        <div className="hidden xl:block w-full rounded-lg">
          <h2 className="text-[32px] font-bold mb-[40px]">
            {profile?.nickname}님의 프로필
          </h2>
          <div className="flex">
            <div className="flex items-center px-4 border-r border-gray-300 w-1/5">
              <div className="relative w-[160px] h-[160px]">
                <Image
                  src={
                    imagePreview ||
                    profile?.profileImage ||
                    '/default-profile.jpg'
                  }
                  className="rounded-full object-cover"
                  alt="Profile"
                  fill
                />
                {isMyPage && (
                  <label
                    htmlFor="xl-file-input"
                    className="absolute bottom-0 right-0 p-1 cursor-pointer bg-orange3 rounded-full"
                  >
                    <PenIcon />
                  </label>
                )}
                {isMyPage && (
                  <input
                    type="file"
                    id="xl-file-input"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center flex-grow pl-[112px] px-4 w-1/2">
              <div className="mb-[28px] flex items-center">
                <p className="text-sub1 w-[92px] text-[18px]">이메일</p>
                <p className="text-sub2">{profile?.email}</p>
              </div>
              <div className="flex items-center h-[30px]">
                <div className="flex items-center">
                  <p className="text-sub1 w-[92px] text-[18px]">닉네임</p>
                  {isEditingNickname ? (
                    <input
                      type="text"
                      value={newNickname}
                      onChange={(e) => setNewNickname(e.target.value)}
                      className="px-2 py-1 w-[125px] border border-blue4 rounded-lg"
                    />
                  ) : (
                    <p className="text-[20px]  w-[125px] font-bold">
                      {profile?.nickname}
                    </p>
                  )}
                </div>
                <div className="ml-12">
                  {isMyPage ? (
                    isEditingNickname ? (
                      <>
                        <button
                          className="text-blue4 mr-2"
                          onClick={handleNicknameEdit}
                        >
                          수정 완료
                        </button>
                        <button
                          className="text-gray5"
                          onClick={handleNicknameEditCancel}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="text-blue4 mr-4"
                          onClick={handleNicknameEdit}
                        >
                          수정
                        </button>
                        <button className="text-orange3" onClick={handleLogout}>
                          로그아웃
                        </button>
                      </>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className="my-[36px] border-t-2 border-gray4 w-full" />
        </div>
      </div>

      <div className="w-full mt-6">
        {isMyPage ? (
          <div>
            <div className="hidden xl:block text-4xl font-bold mb-4">피드</div>
            <div className="flex justify-center xl:justify-start flex-grow">
              <button
                className={`p-2 flex-1 xl:flex-none xl:px-4 ${
                  selectedTab === 'feedsList'
                    ? 'bg-white text-black border-b-4 border-blue4'
                    : 'text-black border-b-4 border-white hover:text-black'
                }`}
                onClick={() => setSelectedTab('feedsList')}
              >
                <p
                  className={`text-lg ${
                    selectedTab === 'feedsList'
                      ? 'font-extrabold text-blue4'
                      : 'font-normal text-black'
                  }`}
                >
                  작성한 글
                </p>
              </button>
              <button
                className={`p-2 flex-1 xl:flex-none xl:px-4 ${
                  selectedTab === 'feedLikes'
                    ? 'bg-white text-black border-b-4 border-blue4'
                    : 'text-black border-b-4 border-white hover:text-black'
                }`}
                onClick={() => setSelectedTab('feedLikes')}
              >
                <p
                  className={`text-lg ${
                    selectedTab === 'feedLikes'
                      ? 'font-extrabold text-blue4'
                      : 'font-normal text-black'
                  }`}
                >
                  찜한 글
                </p>
              </button>
              <button
                className={`p-2 flex-1 xl:flex-none xl:px-4 ${
                  selectedTab === 'placeLikes'
                    ? 'bg-white text-black border-b-4 border-blue4'
                    : 'text-black border-b-4 border-white hover:text-black'
                }`}
                onClick={() => setSelectedTab('placeLikes')}
              >
                <p
                  className={`text-lg ${
                    selectedTab === 'placeLikes'
                      ? 'font-extrabold text-blue4'
                      : 'font-normal text-black'
                  }`}
                >
                  찜한 장소
                </p>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="hidden xl:block text-4xl font-bold mb-4">
                피드
              </div>
              <p className="text-lg font-extrabold text-blue4 ml-3">
                작성한 글
              </p>
              <div className="mt-2 border-b-4 border-blue4 w-24"></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 justify-center bg-gray0 xl:bg-transparent px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default MyPage;
