import type { Metadata } from 'next';
import AllProductsClient from './all-products-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "All Products | HTG - Premium Clothing Store",
    description: "Browse the complete collection at HTG. Shop for high-quality fashion, digital goods, and more. Physical delivery in Pakistan, digital worldwide.",
    openGraph: {
        title: "All Products - Shop Our Full Collection",
        description: "Browse the complete collection at HTG. Shop for high-quality fashion, digital goods, and more. Physical delivery in Pakistan, digital worldwide.",
        url: "/all-products",
    }
};

export default function AllProductsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <AllProductsClient />
        </Suspense>
    );
}
