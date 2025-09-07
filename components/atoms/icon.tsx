import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function Icon({ src, alt, size = 24, className }: IconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
    />
  );
}