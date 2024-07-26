'use client';

import { createClient } from '@/utils/supabase/client';
import { showToast } from '@/utils/toastHelper';
import { useEffect, useState } from 'react';

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
    email: '',
    profileImage: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        const { data, error } = await supabase
          .from('Users')
          .select('nickname, email, profileImage')
          .eq('id', user.data.user?.id)
          .single();

        if (error) {
          console.error('에러', error.message);
        } else {
          setProfile(data);
          setEditProfile({
            nickname: data.nickname,
            email: data.email,
            profileImage: data.profileImage,
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const user = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('Users')
        .update({
          nickname: editProfile.nickname,
          email: editProfile.email,
          profileImage: editProfile.profileImage,
        })
        .eq('id', user.data.user?.id);

      if (error) {
        console.error('에러', error.message);
      } else {
        setProfile(editProfile);
        setIsEditing(false);
        showToast('success', '수정이 완료되었습니다');
      }
    }
  };

  return (
    <div>
      <div>마이 페이지</div>
      <div className="flex items-center bg-cyan-200 rounded-md w-full m-10">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_4390239%2F43902391618.20231108175120.jpg&type=a340"
          className="h-12 m-3 rounded-full"
        />
        <div>
          {isEditing ? (
            <>
              <div className="mt-5">
                email:
                <input
                  type="text"
                  value={editProfile.email}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, email: e.target.value })
                  }
                  className="ml-2 p-1 border rounded"
                />
              </div>
              <div className="mb-5">
                닉네임:
                <input
                  type="text"
                  value={editProfile.nickname}
                  onChange={(e) =>
                    setEditProfile({ ...editProfile, nickname: e.target.value })
                  }
                  className="ml-2 p-1 border rounded"
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-5">email: {profile.email}</div>
              <div className="mb-5">
                닉네임:
                {profile.nickname}
              </div>
            </>
          )}
        </div>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="m-2 w-40 rounded-md bg-sky-500"
          >
            수정 완료
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="m-5 w-30  rounded-md bg-sky-500"
          >
            프로필 수정
          </button>
        )}
      </div>

      <div className="flex justify-center m-10">
        <button
          className={`m-2 p-2 border-b-4 ${
            selectedCategory === '작성한 글'
              ? 'bg-white text-black border-sky-300'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('작성한 글')}
        >
          작성한 글
        </button>
        <button
          className={`m-2 p-2 border-b-4 ${
            selectedCategory === '찜한 글'
              ? 'bg-white text-black border-sky-300'
              : 'bg-gray-200'
          }`}
          onClick={() => setSelectedCategory('찜한 글')}
        >
          찜한 글
        </button>
      </div>

      {selectedCategory === '작성한 글' && (
        <div className="m-10">
          <h2 className="text-lg font-bold">작성한 글</h2>
          <ul className="list-disc list-inside">
            <li>작성한 글 1</li>
            <li>작성한 글 2</li>
            <li>작성한 글 3</li>
          </ul>
        </div>
      )}

      {selectedCategory === '찜한 글' && (
        <div className="m-10">
          <h2 className="text-lg font-bold">찜한 글</h2>
          <ul className="list-disc list-inside">
            <li>찜한 글 1</li>
            <li>찜한 글 2</li>
            <li>찜한 글 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyPage;
