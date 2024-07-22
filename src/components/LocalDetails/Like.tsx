import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Like = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div>
      <button onClick={handleLike}>
        <FontAwesomeIcon
          icon={liked ? faHeart : faHeart}
          style={{
            color: liked ? '#ff5c5c' : '#878787',
            fontSize: '1.5rem',
          }}
        />
      </button>
    </div>
  );
};

export default Like;
