# Garments - Modern E-commerce Fashion Store

## 📋 Project Description

- Designed and built a modern, full-featured e-commerce fashion store with product catalog, shopping cart, checkout flow, and category filtering using React 18, Vite, and Tailwind CSS.
- Implemented a single-page application (SPA) with multiple routes via React Router DOM v6 with smart component caching, lazy loading, and route prefetching to deliver fast, seamless navigation across product listings, detail pages, and checkout.
- Developed a responsive Stripe-integrated storefront UI for product browsing, size/color variant selection, cart management, and secure payment processing with Formik and Yup form validation.
- Integrated Framer Motion animations and React Window virtualization to enhance rendering performance and deliver smooth, polished user experience across desktop, tablet, and mobile viewports.
- Ensured modular, scalable component architecture with dedicated layers for cart, filters, layout, product display, and search, supporting future expansion to additional product lines and features.

A modern, high-performance e-commerce website for fashion garments built with React and Vite. Features a clean, responsive design with advanced performance optimizations including lazy loading, component caching, and image preloading.

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog** - Browse men's and women's clothing collections
- **Product Details** - Detailed product pages with multiple images, size/color variants
- **Shopping Cart** - Add/remove items with persistent cart state
- **Checkout Process** - Complete checkout flow with Stripe integration
- **Category Filtering** - Filter by categories like tops, pants, outerwear, shoes, etc.
- **Search & Navigation** - Easy navigation between product categories

### 🎯 Product Categories
- Men's & Women's Clothing
- Holiday Gifting Collections
- New Arrivals
- Best Sellers
- Tops, Pants, Outerwear, Shoes, Dresses, Suits
- Formal Wear

### 🚀 Performance Features
- **Lazy Loading** - Components and images load on demand
- **Component Caching** - Smart caching prevents re-rendering between navigations
- **Image Preloading** - Critical images preload for faster perceived performance
- **Route Prefetching** - Key pages prefetch in background
- **Optimized Animations** - Smooth transitions with Framer Motion

### 📱 User Experience
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI** - Clean, minimalist design with Tailwind CSS
- **Loading States** - Beautiful loading animations and states
- **Smooth Scrolling** - Automatic scroll to top on page changes
- **Community Features** - Testimonials and community sections

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Framer Motion animations
- **Routing**: React Router DOM v6
- **Forms**: Formik with Yup validation
- **Payment**: Stripe integration
- **State Management**: React Context (Cart state)
- **Icons**: React Icons
- **Image Handling**: React Lazy Load Image Component
- **Performance**: React Window for virtualization

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Garment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── cart/           # Shopping cart components
│   ├── common/         # Common UI elements
│   ├── filters/        # Product filtering components
│   ├── home/           # Homepage sections
│   ├── layout/         # Layout components (header, footer)
│   ├── loader/         # Loading components
│   ├── product/        # Product-related components
│   └── search/         # Search functionality
├── context/            # React Context providers
├── data/               # Static data (products, testimonials)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
    ├── Home.jsx        # Homepage
    ├── ProductListing.jsx
    ├── ProductDetail.jsx
    ├── Checkout.jsx
    ├── About.jsx
    └── ...
```

## 🎨 Key Features Explained

### Smart Component Caching
The app uses an advanced caching system that keeps rendered components in memory, preventing expensive re-renders when navigating between pages.

### Lazy Loading Strategy
Components are loaded only when needed, with priority loading for critical above-the-fold content and background loading for less critical sections.

### Image Optimization
- WebP format for better compression
- Lazy loading for non-critical images
- Preloading for hero and featured images
- Responsive image sizing

## 🔧 Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📄 Pages Available

- **Home** (`/`) - Landing page with featured collections
- **Product Catalog** (`/catalog`) - Browse all products
- **Men's Section** (`/men/*`) - Men's clothing categories
- **Women's Section** (`/women/*`) - Women's clothing categories
- **Product Details** (`/product/:id`) - Individual product pages
- **Checkout** (`/checkout`) - Shopping cart and payment
- **About** (`/about`) - Company information
- **Stores** (`/stores`) - Store locations
- **Sustainability** (`/sustainability`) - Environmental initiatives
- **Careers** (`/careers`) - Job opportunities
- **Holiday Gifting** (`/holiday`) - Special holiday collections

Built with modern web technologies and optimized for performance and user experience.
