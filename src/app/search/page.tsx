import type { Metadata } from 'next';
import SearchClient from './search-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search for products at HTG. Find the fashion and digital goods you're looking for with our powerful and easy-to-use search.",
  openGraph: {
    title: "Search Products",
    description: "Search for products at HTG. Find the fashion and digital goods you're looking for with our powerful and easy-to-use search.",
    url: "/search",
  }
};

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchClient />
    </Suspense>
  );
}
