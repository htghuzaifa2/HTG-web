
import { Suspense } from 'react';
import Loading from './loading';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import Script from 'next/script';
import ProductDetailsClient from './product-details-client';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/types';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  // Find the full category name from the slug
  const primaryCategoryName = categoriesData.categories.find(c => c.slug === product.category[0])?.name || product.category[0];

  const description = `Shop the ${product.name}, a premium ${primaryCategoryName} at HTG. ${product.description} Enjoy nationwide delivery in Pakistan.`.substring(0, 160);

  return {
    title: product.name,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      url: `/product/${product.slug}`,
      images: [
        {
          url: product.image.url,
          width: 800,
          height: 800,
          alt: product.image.alt,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = productsData.find((p) => p.slug === params.slug) as Product;

  if (!product) {
    notFound();
  }

  // --- Related Products Logic (Server Side) ---
  const allProducts: Product[] = productsData as unknown as Product[];
  
  // 1. Get all products from the same category, excluding the current one.
  const sameCategoryProducts = allProducts.filter(p =>
    p.id !== product.id &&
    p.category.some(cat => product.category.includes(cat))
  );

  // Use a pseudo-random seed based on product ID to make the shuffle consistent across builds/renders if needed,
  // or just use Math.random() if we accept it might change on re-validation.
  // Since we want consistent hydration, doing it on server is key.
  // However, Math.random() in a Server Component is fine as long as the Client receives the result as props.
  const shuffledSameCategory = [...sameCategoryProducts].sort(() => 0.5 - Math.random());

  let relatedProducts = shuffledSameCategory.slice(0, 10);

  // 2. If we still don't have 10 products, fill the rest with random products.
  if (relatedProducts.length < 10) {
    const needed = 10 - relatedProducts.length;
    const currentIds = new Set(relatedProducts.map(p => p.id).concat(product.id));

    const randomProducts = allProducts
      .filter(p => !currentIds.has(p.id)) // Exclude already selected products and the main product
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, needed);

    relatedProducts = [...relatedProducts, ...randomProducts];
  }
  // --------------------------------------------

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const availability = isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image.url,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      url: `https://htg.com.pk/product/${product.slug}`,
      priceCurrency: 'PKR',
      price: product.price.toFixed(2),
      availability: availability,
    },
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<Loading />}>
        <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
      </Suspense>
    </>
  );
}
