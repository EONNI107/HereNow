'use client';

import { createClient } from '@/utils/supabase/client';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MyPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState({
    nickname: '',
    email: '',
    profileImage: '',
  });
  const [selectedCategory, setSelectedCategory] = useState('작성한 글');
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({
    nickname: '',
    profileImage: '',
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]); // State to store posts
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // New state for authentication

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
        const { data, error: profileError } = await supabase
          .from('Users')
          .select('nickname, email, profileImage')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('에러', profileError.message);
        } else {
          setProfile(data);
          setEditProfile({
            nickname: data.nickname,
            profileImage: data.profileImage,
          });
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error: postsError } = await supabase
          .from(selectedCategory === '작성한 글' ? 'Posts' : 'Favorites')
          .select('*')
          .eq('userId', user.id);

        if (postsError) {
          console.error('Error fetching posts:', postsError.message);
        } else {
          setPosts(data);
        }
      }
      setLoading(false);
    };

    fetchPosts();
  }, [selectedCategory]);

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
      console.error('Error uploading file:', error.message);
      return null;
    }

    return data.path;
  };

  const handleUpdate = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (user) {
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

      if (updateError) {
        console.error('에러', updateError.message);
      } else {
        setProfile((prev) => ({
          ...prev,
          nickname: editProfile.nickname,
          profileImage: imagePath,
        }));
        setIsEditing(false);
        toast.success('프로필 수정이 완료되었습니다.');
      }
    }
  };

  return (
    <div className="pt-10 flex flex-col h-svh ">
      <div
        className={`flex items-center rounded-2xl w-full h-28 ${
          isAuthenticated ? 'bg-[#DBEEFF]' : 'bg-[#FFF4F0]'
        }`}
      >
        <div className="relative flex items-center w-full justify-between p-5 pr-10">
          <img
            src={
              imagePreview ||
              profile.profileImage ||
              'https://via.placeholder.com/150'
            }
            className="h-16 w-16 m-3 rounded-full"
            alt="Profile"
          />
          {!isAuthenticated && (
            <a href="/sign-in">
              <button className="ml-4 p-2 bg-[#FD8B59] text-white rounded ">
                로그인 · 회원가입
              </button>
            </a>
          )}
          {isEditing && (
            <div>
              <label
                htmlFor="file-input"
                className="absolute bottom-2 right-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
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
          {isEditing ? (
            <>
              <div className="mt-5">{profile.email}</div>
              <div className="mb-5">
                <input
                  type="text"
                  value={editProfile.nickname}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, nickname: e.target.value })
                  }
                  className="p-1 border rounded w-28"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-5">{profile.email}</div>
              <div className="mb-5"> {profile.nickname}</div>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div>
            {isEditing ? (
              <div className="flex flex-col space-y-2 mt-2">
                <button
                  onClick={handleUpdate}
                  className="m-2 w-40 rounded-md bg-sky-500 text-white"
                >
                  수정 완료
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="m-2 w-40 rounded-md bg-gray-500 text-white"
                >
                  취소
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="m-5 w-40 rounded-md bg-sky-500 text-white"
              >
                프로필 수정
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center w-full mt-7">
        <button
          className={`m-2 p-2 border-b-4 flex-1 ${
            selectedCategory === '작성한 글'
              ? 'bg-white text-black border-sky-300'
              : ''
          }`}
          onClick={() => setSelectedCategory('작성한 글')}
        >
          작성한 글
        </button>
        <button
          className={`m-2 p-2 border-b-4 flex-1 ${
            selectedCategory === '찜한 글'
              ? 'bg-white text-black border-sky-300'
              : ''
          }`}
          onClick={() => setSelectedCategory('찜한 글')}
        >
          찜한 글
        </button>
      </div>

      <div className="flex flex-1 justify-center py-10 bg-gray-50 items-center">
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 mx-auto text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p className="mt-2">작성한 게시글이 없어요</p>
          </div>
        ) : (
          <div>{/* 작성한 게시글 */}</div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
