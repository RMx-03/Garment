import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://img.freepik.com/free-photo/girl-yellow-wall-with-shopping-bags_1157-34351.jpg?t=st=1743157201~exp=1743160801~hmac=9fcb9100b990a0023f4663d11e4fdf88b18dcf1b7db8afeb9665a03b23e30707&w=1380"
            loading="lazy"
            alt="About Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-6xl font-light mb-6">
            We believe<br />
            we can all<br />
            make<br />
            a difference.
          </h1>
          <p className="text-xl">
            Our way: Exceptional quality.<br />
            Ethical factories. Radical Transparency.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-3xl leading-relaxed">
          At Garments, we want the right choice to be as easy as putting on a great T-shirt. 
          That's why we partner with the best, ethical factories around the world. 
          Source only the finest materials. And share those stories with you—down to the true cost of every product we make. 
          It's a new way of doing things. We call it Radical Transparency.
        </p>
      </div>

      {/* Transparency Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">OUR PRICES</h2>
              <h3 className="text-3xl">Radically Transparent.</h3>
              <p className="text-lg text-gray-600">
                We believe our customers have a right to know how much their clothes cost to make. 
                We reveal the true costs behind all of our products—from materials to labor to transportation—then 
                offer them to you, minus the traditional retail markup.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="h-64 bg-gray-200"></div>
                <p className="mt-4 text-center">Garments T-shirt</p>
              </div>
              <div>
                <div className="h-64 bg-gray-400"></div>
                <p className="mt-4 text-center">Traditional Retail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More to Explore */}
      <div className="py-24">
        <h2 className="text-3xl text-center mb-16">More to Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f"
              loading="lazy"
              alt="Our Materials"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl">Our Materials</h3>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              loading="lazy"
              alt="Our Factories"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl">Our Factories</h3>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475"
              loading="lazy"
              alt="Our Stores"
              className="w-full h-64 object-cover"
            />
            <h3 className="mt-4 text-xl">Our Stores</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;