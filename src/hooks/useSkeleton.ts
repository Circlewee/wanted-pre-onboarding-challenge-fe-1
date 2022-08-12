import { useState, useEffect } from 'react';

const useSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [queryState, setQueryState] = useState({ isLoading: false, isFetching: false });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!queryState.isLoading && !queryState.isFetching) {
      timer = setTimeout(() => setIsVisible(true), 1500);
    }

    return () => clearTimeout(timer);
  }, [queryState.isLoading, queryState.isFetching]);

  return { isVisible, setQueryState };
};

export default useSkeleton;
