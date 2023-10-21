import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
  link?: string;
};

const ImageContainer: React.FC<Props> = ({ src, alt, link }) => {
  const gamePartner = (
    <div className="transform hover:scale-[103%] transition-transform duration-300 cursor-pointer">
      <Image
        src={src}
        alt={alt}
        width={278}
        height={278}
        className="rounded-[24px]"
      />
    </div>
  );

  if (link) {
    return (
      <Link target="_blank" rel="noopener noreferrer" href={link}>
        {gamePartner}
      </Link>
    );
  }

  return gamePartner;
};

export default ImageContainer;
