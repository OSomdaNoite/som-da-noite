import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel = ({ images, title, className = "" }) => {
  if (!images?.length) return null;

  return (
    <section className={`w-full py-10 ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold text-center mb-8" style={{ color: 'var(--textColor)' }}>
          {title}
        </h2>
      )}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="px-4"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ImageCarousel;
