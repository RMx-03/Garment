import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'SHIRTS',
    href: '/category/shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf'
  },
  {
    name: 'DENIM',
    href: '/category/denim',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d'
  },
  {
    name: 'TEES',
    href: '/category/tees',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'
  },
  {
    name: 'PANTS',
    href: '/category/pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80'
  },
  {
    name: 'SWEATERS',
    href: '/category/sweaters',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633'
  },
  {
    name: 'OUTERWEAR',
    href: '/category/outerwear',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb'
  }
];

const CategoryGrid = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900 text-center my-8">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.href}
            className="group relative"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 text-center">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;