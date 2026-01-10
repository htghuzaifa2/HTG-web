import type { Metadata } from 'next';
import CategoriesClient from './categories-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Product Categories - Fashion, Tech & More',
  description: 'Explore all product categories at HTG. Browse our curated collections of fashion, tech, digital goods, and more to find exactly what you need.',
  openGraph: {
    title: 'Product Categories - Fashion, Tech & More',
    description: 'Explore all product categories at HTG. Browse our curated collections of fashion, tech, digital goods, and more to find exactly what you need.',
    url: '/categories',
  }
};

export default function CategoriesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CategoriesClient />
    </Suspense>
  );
}
