import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="relative">
      <NextImage
        className="image"
        src={src}
        alt={alt}
        priority
        fill
        sizes="100vw"
      />
    </div>
  );
};

export default Image;
