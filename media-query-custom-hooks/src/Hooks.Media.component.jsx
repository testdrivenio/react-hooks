import { useState, useEffect } from 'react';

const useMedia = (query) => {
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches,
  );
  // componentDidMount AND componentDidUnmount
  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      console.log('if(media.matches !== matches)');
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    media.addListener(listener);

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

export default useMedia;
