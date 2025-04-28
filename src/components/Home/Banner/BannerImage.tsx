export const BannerImage = ({
  src,
  alt,
  priority = false, // pasamos priority desde el padre
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) => (
  <img
    src={src}
    alt={alt}
    width="1905"
    height="500"
    decoding="async"
    loading={priority ? "eager" : "lazy"}
    fetchPriority={priority ? "high" : "auto"}
    className="w-full sm:h-[500px] object-cover"
  />
);
