import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const useSlug = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const [slugState, setSlugState] = useState(slug);
  const [oldSlug, setOldSlug] = useState(slug);

  const slugChanged = useCallback(
    (newSlug) => {
      const newUrl = pathname.replace(slug, newSlug);
      setSlugState(newSlug);
      setOldSlug(slug);
      window.history.pushState({}, '', newUrl);
    },
    [slug, pathname]
  );

  useEffect(() => {
    setSlugState(slug);
  }, [slug]);

  return { slug: slugState, setSlug: slugChanged, oldSlug };
};

export default useSlug;

