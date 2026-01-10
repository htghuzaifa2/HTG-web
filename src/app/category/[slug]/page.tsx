import type { Metadata } from 'next';
import CategoryClient from './category-client';
import categoriesData from '@/data/categories.json';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';
import type { Category } from '@/lib/types';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categoriesData.categories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  return {
    title: `${category.name} Collection`,
    description: `Shop the best ${category.name} at HTG. Explore our curated collection and find the latest trends in ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `${category.name} Collection`,
      description: `Shop the best ${category.name} at HTG. Explore our curated collection and find the latest trends in ${category.name.toLowerCase()}.`,
      url: `/category/${category.slug}`,
      images: [
        {
          url: category.image,
          width: 600,
          height: 400,
          alt: category.name,
        },
      ],
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = categoriesData.categories.find(c => c.slug === params.slug) as Category;

  if (!category) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <CategoryClient category={category} />
    </Suspense>
  );
}
