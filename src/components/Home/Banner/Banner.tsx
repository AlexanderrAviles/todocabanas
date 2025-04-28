import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";
import { BannerImage } from "./BannerImage";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const Banner = ({ banners, loading }) => {
  const isMobile = useIsMobile();

  const activeBanners = banners.filter((banner) => banner.status);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  if (loading || activeBanners.length === 0) return null;

  return (
    <div
      ref={sliderRef}
      className="keen-slider w-full overflow-hidden min-h-[500px]"
    >
      {activeBanners.map((banner, index) => (
        <div className="keen-slider__slide" key={banner.id}>
          <BannerImage
            src={
              isMobile
                ? banner.image_mobile[0]?.thumbnails.large.url
                : banner.image[0]?.thumbnails.large.url
            }
            alt={banner.name}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
