import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    rating: 5,
    text: "Love this shirt! Fits perfectly and the fabric is thick without being stiff.",
    author: "JonSnSF",
    product: "The Heavyweight Overshirt",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
  },
  {
    rating: 5,
    text: "Perfect fit and amazing quality. Will definitely buy more!",
    author: "EmmaB",
    product: "The Organic Cotton Crew",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
  }
];

const favorites = [
  {
    name: "The Waffle Long-Sleeve Crew",
    price: 60,
    color: "Bone",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
  },
  {
    name: "The Organic Cotton Turtleneck",
    price: 48,
    color: "Black",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
  },
  {
    name: "The Cashmere Crew",
    price: 145,
    color: "Heather Gray",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27"
  },
  {
    name: "The Performance Chino",
    price: 72,
    color: "Khaki",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80"
  },
  {
    name: "The Wool Overcoat",
    price: 248,
    color: "Charcoal",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb"
  },
  {
    name: "The Slim Fit Oxford",
    price: 64,
    color: "White",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
  }
];

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      
      {/* Featured Collections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="New Arrivals"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP THE LATEST</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                alt="Best Sellers"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">Best Sellers</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP YOUR FAVORITES</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="Holiday Collection"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">The Holiday Outfit</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP OCCASION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24">
        <img
          src="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
          alt="Mission"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative bg-black bg-opacity-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">We're on a Mission To Clean Up the Industry</h2>
            <p className="text-lg mb-8">Read about our progress in our latest Impact Report.</p>
            <button className="bg-white text-black px-8 py-3 hover:bg-gray-100">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Garment Favorites */}
      <section className="py-16">
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
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">People Are Talking</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col justify-center">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-xl mb-4">"{testimonial.text}"</p>
                    <p className="text-sm text-gray-600">
                      -- {testimonial.author}, {testimonial.product}
                    </p>
                  </div>
                  <div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.product}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;