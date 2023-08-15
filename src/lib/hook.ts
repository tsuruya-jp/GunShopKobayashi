import { useEffect, useState } from "react";

export const GetWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: 0,
    windowHeight: 0
  });
  useEffect(() => {
    const onResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      });
    }
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return windowSize;
}
