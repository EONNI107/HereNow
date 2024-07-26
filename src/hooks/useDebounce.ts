'use client';
import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay = 500) {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceVal;
}
