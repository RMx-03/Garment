import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Virtual } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedCollections from '../components/home/FeaturedCollections';
import SlideItem from '../components/home/SlideItem';
import TestimonialSlide from '../components/home/TestimonialSlide';
import MissionSection from '../components/home/MissionSection';
import { getFavourites } from '../data/products';
import testimonials from '../data/testimonials' 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const getSwiperOptions = {
  modules: [Navigation, Virtual],
  lazy: { loadPrevNext: true },    
  spaceBetween: 24,
  slidesPerView: 4,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  className: 'favorites-swiper px-12',
  breakpoints: {
    320: { slidesPerView: 1 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  }
};

const Home = () => {
  const favorites = getFavourites();
  const handleFavClick = (product) => {
    console.log('Fav clicked for:', product.name);
  };
    
  return (
    <div>
      <Hero />
      <CategoryGrid />
      <FeaturedCollections />
      
      {/* Garment Favorites */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Garment Favourites</h2>
          <p className="text-center text-gray-600 mb-8">
            Beautifully Functional. Purposefully Designed. Consciously Crafted.
          </p>
          <div className="relative">
            <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <FiChevronRight className="w-6 h-6" />
            </button>
            <Swiper {...getSwiperOptions}>
              {favorites.map((product, index) => (
                <SwiperSlide virtualIndex={index} key={product.id}>
                  <SlideItem product={product} onFavClick={handleFavClick} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-16">People Are Talking</h2>
          <div className="max-w-6xl mx-auto"> 
            <Swiper
              modules={[Navigation, Pagination]}
              lazy={{ loadPrevNext: true }}                            
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide virtualIndex={index} key={testimonial.id}>
                  <TestimonialSlide testimonial={testimonial} />
                </SwiperSlide>
            ) )}
            </Swiper>
          </div>
        </div>
      </section>

      <MissionSection />
    </div>
  );
};

export default Home;