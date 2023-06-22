import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="relative aspect-auto h-full">
      <NextImage
        className="object-cover"
        src={src}
        alt={alt}
        fill
      />
    </div>
  );
};

export default Image;
