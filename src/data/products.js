export const Categories = {
    HOLIDAY_GIFTING: 'holiday-gifting',
    NEW_ARRIVALS: 'new-arrivals',
    BEST_SELLERS: 'best-sellers',
    CLOTHING: 'clothing',
    TOPS: 'tops',
    PANTS: 'pants',
    OUTERWEAR: 'outerwear',
    SHOES: 'shoes',
    DRESSES: 'dresses',
    SUITS: 'suits',
    FORMAL: 'formal',
    FAVOURITES: 'favourites',
};

export const Products = {
    women: [
      {
        id: 1,
        name: 'The Cloud Relaxed Cardigan',
        price: 132,
        originalPrice: 188,
        discount: '30% off',
        description: 'A relaxed-fit cardigan made from our signature cloud-soft yarn blend. Perfect for layering with a subtle oversized silhouette and deep pockets.',
        details: [
          "70% Merino Wool, 30% Cashmere",
          "Relaxed, oversized fit",
          "Button closure with genuine mother of pearl buttons",
          "Deep patch pockets",
          "Ribbed cuffs and hem",
          "Hand wash cold, lay flat to dry",
          "Made in Italy"
        ],
        image: [
          "/images/products/pexels-cup-of-couple-6634909.webp",
          "/images/products/pexels-ayoub-moukhliss-1262835-22944600.webp",
          "/images/products/pexels-mutecevvil-18851697.webp",
          "/images/products/pexels-a-darmel-8989569.webp"
        ],
        colors: ['Cream', 'Black', 'Navy', 'Camel'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'Sweaters',
        categories: [Categories.HOLIDAY_GIFTING, Categories.BEST_SELLERS, Categories.FAVOURITES],
        rating: 4.8,
        reviews: 156,
        inStock: true,
        date: '2024-01-15'
      },
      {
        id: 2,
        name: 'The Organic Cotton Turtleneck',
        price: 35,
        originalPrice: 50,
        discount: '30% off',
        description: 'A classic turtleneck made from 100% organic cotton. Soft, breathable, and perfect for layering. Features a comfortable stretch and fitted silhouette.',
        details: [
          "100% Organic Cotton",
          "Fitted silhouette",
          "Ribbed turtleneck, cuffs, and hem",
          "Medium weight fabric",
          "Machine wash cold",
          "Made in Portugal"
        ],
        image: [
          "/images/products/marcel-strauss-Kv6NXMlNBVI-unsplash.webp",
          "/images/products/jed-cobourn-4wGLUcmZFc4-unsplash.webp",
          "/images/products/marcel-strauss-JiBaSCt8KDo-unsplash.webp",
          "/images/products/liz-weddon-GZW1FQuZFaY-unsplash.webp"
          // "https://images.unsplash.com/photo-1551163943-3f6a855d1153"
        ],
        colors: ['Black', 'White', 'Navy', 'Gray'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'Tops',
        categories: [Categories.NEW_ARRIVALS, Categories.TOPS],
        rating: 4.9,
        reviews: 243,
        inStock: true,
        date: '2024-01-10'
      },
      {
        id: 3,
        name: 'The Silk Relaxed Shirt',
        price: 98,
        originalPrice: 140,
        discount: '30% off',
        description: 'A luxurious relaxed-fit shirt crafted from 100% silk. Features a hidden button placket and curved hem. Perfect for both casual and formal occasions.',
        details: [
          "100% Mulberry Silk",
          "Relaxed fit",
          "Hidden button placket",
          "Curved hem",
          "French seams",
          "Dry clean only",
          "Made in China"
        ],
        image: [
          "/images/products/karsten-winegeart-5Y3pdONPEHE-unsplash.webp",          
          "/images/products/karsten-winegeart-5M7iCKfckQ8-unsplash.webp",
          "/images/products/karsten-winegeart-KUO2PwoAFRI-unsplash.webp",
          "/images/products/karsten-winegeart-G3TiavJKCpY-unsplash.webp"
        ],
        colors: ['White', 'Black', 'Navy', 'Blush'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'Tops',
        categories: [Categories.NEW_ARRIVALS, Categories.TOPS, Categories.FAVOURITES],
        rating: 4.7,
        reviews: 89,
        inStock: true,
        date: '2024-01-20'
      },
      {
        id: 7,
        name: 'The Wool Blend Blazer',
        price: 188,
        originalPrice: 268,
        discount: '30% off',
        description: 'A timeless blazer crafted from Italian wool blend. Features a tailored fit, notched lapels, and flap pockets. Perfect for office wear or special occasions.',
        details: [
          "80% Wool, 20% Polyamide",
          "Tailored fit",
          "Notched lapels",
          "Two-button closure",
          "Flap pockets",
          "Full lining",
          "Dry clean only",
          "Made in Italy"
        ],
        image: [
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
          "https://images.unsplash.com/photo-1591047139756-eec307b1a1de",
          "https://images.unsplash.com/photo-1591047139844-d85d9f8eaad6",
          "https://images.unsplash.com/photo-1591047139837-dc32e1ba960d"
        ],
        colors: ['Black', 'Navy', 'Gray', 'Camel'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'Outerwear',
        categories: [Categories.OUTERWEAR, Categories.HOLIDAY_GIFTING],
        rating: 4.9,
        reviews: 67,
        inStock: true,
        date: '2024-01-05'
      },
      {
        id: 8,
        name: 'The High-Rise Straight Leg Jean',
        price: 98,
        originalPrice: 140,
        discount: '30% off',
        description: 'Our bestselling high-rise jean with a classic straight leg fit. Made from premium Japanese denim with just the right amount of stretch.',
        details: [
          "98% Cotton, 2% Elastane",
          "High rise, straight leg fit",
          "11-inch rise, 27-inch inseam",
          "5-pocket styling",
          "Button fly closure",
          "Machine wash cold",
          "Made in USA"
        ],
        image: [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452"
        ],
        colors: ['Light Wash', 'Medium Wash', 'Dark Wash', 'Black'],
        sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
        category: 'Pants',
        categories: [Categories.PANTS, Categories.BEST_SELLERS, Categories.FAVOURITES],
        rating: 4.8,
        reviews: 324,
        inStock: true,
        date: '2024-01-12'
      }
    ],
  
    men: [
      {
        id: 4,
        name: 'The Performance Chino',
        price: 68,
        originalPrice: 98,
        discount: '30% off',
        description: 'A modern take on the classic chino, made with innovative 4-way stretch fabric. Water-resistant and wrinkle-resistant for easy care.',
        details: [
          "97% Cotton, 3% Elastane",
          "Slim fit with slight stretch",
          "Water-resistant finish",
          "Hidden zip pocket",
          "Wrinkle-resistant",
          "Machine wash cold",
          "Made in Vietnam"
        ],
        image: [
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
          "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80",
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a"
        ],
        colors: ['Khaki', 'Navy', 'Black', 'Olive'],
        sizes: ['28x30', '30x30', '32x30', '34x30', '36x30'],
        category: 'Pants',
        categories: [Categories.PANTS, Categories.BEST_SELLERS],
        rating: 4.8,
        reviews: 245,
        inStock: true,
        date: '2024-01-15'
      },
      {
        id: 5,
        name: 'The Merino Wool Sweater',
        price: 98,
        originalPrice: 140,
        discount: '30% off',
        description: 'A classic crew neck sweater made from premium merino wool. Temperature-regulating and naturally odor-resistant.',
        details: [
          "100% Merino Wool",
          "Regular fit",
          "Ribbed collar, cuffs, and hem",
          "Temperature-regulating",
          "Odor-resistant",
          "Hand wash cold",
          "Made in Scotland"
        ],
        image: [
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
          "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
        ],
        colors: ['Navy', 'Charcoal', 'Forest', 'Burgundy'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sweaters',
        categories: [Categories.HOLIDAY_GIFTING, Categories.BEST_SELLERS],
        rating: 4.9,
        reviews: 189,
        inStock: true,
        date: '2024-01-08'
      },
      {
        id: 6,
        name: 'The Oxford Shirt',
        price: 64,
        originalPrice: 88,
        discount: '30% off',
        description: 'A timeless Oxford shirt made from premium cotton. Features a modern slim fit and our signature button-down collar.',
        details: [
          "100% Cotton Oxford cloth",
          "Slim fit",
          "Button-down collar",
          "Single chest pocket",
          "Back box pleat",
          "Machine wash cold",
          "Made in Portugal"
        ],
        image: [
          "/images/products/pexels-ferartstudio-15445847.webp",
          "/images/products/tim-hasse-dupe.webp",
          "/images/products/raymond-petrik-HSOpItAokh4-unsplash.webp",
          "/images/products/ivan-le-vv-zq0FgrZc-unsplash.webp"
        ],
        colors: ['White', 'Blue', 'Gray', 'Pink'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Shirts',
        categories: [Categories.NEW_ARRIVALS, Categories.TOPS, Categories.FAVOURITES],
        rating: 4.7,
        reviews: 156,
        inStock: true,
        date: '2024-01-20'
      },
      {
        id: 10,
        name: 'The Selvedge Denim Jean',
        price: 128,
        originalPrice: 168,
        discount: '24% off',
        description: 'Premium selvedge denim from Japans Kaihara Mill. Features a modern slim fit with slight stretch for comfort.',
        details: [
          "13.5oz Japanese selvedge denim",
          "98% Cotton, 2% Elastane",
          "Slim fit",
          "Button fly",
          "Selvedge detail on coin pocket",
          "Leather patch",
          "Machine wash cold",
          "Made in Japan"
        ],
        image: [
          "https://images.unsplash.com/photo-1542272604-787c3835535d",
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          "https://images.unsplash.com/photo-1475178626620-a4d074967452",
          "https://images.unsplash.com/photo-1542272604-787c3835535d"
        ],
        colors: ['Raw', 'Dark Wash', 'Medium Wash', 'Light Wash'],
        sizes: ['28x30', '30x30', '32x30', '34x30', '36x30'],
        category: 'Pants',
        categories: [Categories.PANTS, Categories.NEW_ARRIVALS],
        rating: 4.9,
        reviews: 267,
        inStock: true,
        date: '2024-01-10'
      }
    ]
};

export const getProductsByCategory = (categoryName) => {
    const allProducts = [...Products.women, ...Products.men];
    return allProducts.filter(product => product.categories?.includes(categoryName));
};

export const getNewArrivals = () => {
    const allProducts = [...Products.women, ...Products.men];
    return allProducts
        .filter(product => product.categories?.includes(Categories.NEW_ARRIVALS))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getBestSellers = () => {
    const allProducts = [...Products.women, ...Products.men];
    return allProducts
        .filter(product => product.categories?.includes(Categories.BEST_SELLERS))
        .sort((a, b) => b.rating - a.rating);
};

export const getHolidayGifts = () => {
    const allProducts = [...Products.women, ...Products.men];
    return allProducts.filter(product => product.categories?.includes(Categories.HOLIDAY_GIFTING));
};

export const getFavourites = () => {
    const allProducts = [...Products.women, ...Products.men];
    return allProducts.filter(product => 
      product.categories?.includes(Categories.FAVOURITES)
    );
};