import { useEffect, useRef, useState } from "react";

// Hook created to mitigate the issue of the gallery modal not updating the image when the image number is changed.

export default function useGalleryState(initialValue: number) {
  const [imgValue, setImgValue] = useState(initialValue);

  const imgRef = useRef(imgValue);

  useEffect(() => {
    imgRef.current = imgValue;
  }, [imgValue]);

  const returnArr: [
    number,
    (value: number) => void,
    React.MutableRefObject<number>
  ] = [imgValue, setImgValue, imgRef];

  return returnArr;
}
