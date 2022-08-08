import { useEffect, useRef, useState } from "react";

export default function useGalleryState(initialValue) {
  const [imgValue, setImgValue] = useState(initialValue);

  const imgRef = useRef(imgValue);

  useEffect(() => {
    imgRef.current = imgValue;
  }, [imgValue]);

  return [imgValue, setImgValue, imgRef];
}
