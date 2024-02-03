"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "@/components/elements/image/Image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const Slider = ({ items, top }: SliderProps) => {
  const classes = top ? "md:!w-[90%] lg:!w-4/5" : "";
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      loop={true}
      slidesPerView={"auto"}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
    >
      {items.map((v) => (
        <SwiperSlide key={v.id} className={classes}>
          <Image src={v.content} alt={""} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
