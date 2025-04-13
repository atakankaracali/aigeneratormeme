import { useEffect } from 'react';

const useCanonical = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = window.location.href;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
};

export default useCanonical;