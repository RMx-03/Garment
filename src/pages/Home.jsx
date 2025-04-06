import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import { Products, getFavourites   } from '../data/products';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-lazy-load-image-component/src/effects/blur.css';

const testimonials = [
  {
    id: 6,
    rating: 5,
    text: "Love this shirt! Fits perfectly and the fabric is thick without being stiff.",
    author: "JonSnSF",
    product: "The Heavyweight Overshirt",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
  },
  {
    id: 1,
    rating: 5,
    text: "Perfect fit and amazing quality. Will definitely buy more!",
    author: "EmmaB",
    product: "The Cloud Relaxed Cardigan",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
  }
];

// const favorites = [
//   {
//     name: "The Waffle Long-Sleeve Crew",
//     price: 60,
//     color: "Bone",
//     image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
//   },
//   {
//     name: "The Organic Cotton Turtleneck",
//     price: 48,
//     color: "Black",
//     image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
//   },
//   {
//     name: "The Cashmere Crew",
//     price: 145,
//     color: "Heather Gray",
//     image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27"
//   },
//   {
//     name: "The Performance Chino",
//     price: 72,
//     color: "Khaki",
//     image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80"
//   },
//   {
//     name: "The Wool Overcoat",
//     price: 248,
//     color: "Charcoal",
//     image: "https://images.unsplash.com/photo-1544923246-77307dd654cb"
//   },
//   {
//     name: "The Slim Fit Oxford",
//     price: 64,
//     color: "White",
//     image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
//   }
// ];

const Home = () => {
  const favorites = getFavourites();
  
  return (
    <div>
      <Hero />
      <CategoryGrid />
      
      {/* Featured Collections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <LazyLoadImage
                src="/images/products/glassesshop-fGTadsxRmTk-unsplash.jpg"
                alt="New Arrivals"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
                  <Link to="/new" className="mt-4 bg-white px-6 py-2 text-sm inline-block hover:bg-gray-100">
                    SHOP THE LATEST
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <LazyLoadImage
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                alt="Best Sellers"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">Best Sellers</h3>
                  <Link to="/best-sellers" className="mt-4 bg-white px-6 py-2 text-sm inline-block hover:bg-gray-100">
                    SHOP YOUR FAVORITES
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <LazyLoadImage
                src="/images/products/molly-archer-BTdHmE4jst8-unsplash.jpg"
                alt="Holiday Collection"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">The Holiday Outfit</h3>
                  <Link to="/holiday" className="mt-4 bg-white px-6 py-2 text-sm inline-block hover:bg-gray-100">
                    SHOP OCCASION
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      

      {/* Garment Favorites */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-2">Garment Favorites</h2>
          <p className="text-center text-gray-600 mb-8">
            Beautifully Functional. Purposefully Designed. Consciously Crafted.
          </p>
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            className="favorites-swiper"
          >
            {favorites.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-w-1 aspect-h-1 object-cover mb-4"
                  />
                  <h3 className="text-sm text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.color}</p>
                  <p className="text-sm font-medium text-gray-900">${item.price}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section> */}
      
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
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={4}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              className="favorites-swiper px-12"
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {favorites.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="relative group">
                    <div className="relative">
                      <Link to={`/product/${product.id}`}>
                        <LazyLoadImage
                          src={product.image[0]}
                          alt={product.name}
                          className="w-full aspect-[3/4] object-cover"
                          effect="blur"
                        />
                      </Link>
                      <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                        <FiHeart className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-4">
                      <Link to={`/product/${product.id}`} className="block">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="mt-1 text-sm">${product.price}</p>
                      </Link>
                    </div>
                  </div>
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
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="grid grid-cols-2 gap-16">
                    <div className="flex flex-col justify-center">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                      <p className="text-xl mb-6">"{testimonial.text}"</p>
                      <p className="text-sm text-gray-600">
                        -- {testimonial.author},&nbsp;
                        <Link 
                          to={`/product/${testimonial.id}`}
                          className="underline hover:text-black"
                        >
                          {testimonial.product}
                        </Link>
                      </p>
                    </div>
                    <div className="aspect-[3/4] overflow-hidden">
                      <Link to={`/product/${testimonial.id}`}>
                        <LazyLoadImage
                          src={testimonial.image}
                          alt={testimonial.product}
                          className="w-full h-full object-cover"                      
                        />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24">
        <LazyLoadImage
          src="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
          alt="Mission"
          className="absolute inset-0 w-full h-full object-cover"          
        />
        <div className="relative bg-black bg-opacity-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">We're on a Mission To Clean Up the Industry</h2>
            <p className="text-lg mb-8">Read about our progress in our latest Impact Report.</p>
            <button className="bg-white text-black px-8 py-3 hover:bg-gray-100">
            <Link
              to="/sustainability"
              className="bg-white text-black px-8 py-3 inline-block hover:bg-gray-100 transition-colors"
            >
              LEARN MORE
            </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;