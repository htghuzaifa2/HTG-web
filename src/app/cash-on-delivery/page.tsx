import { Metadata } from 'next';
import CashOnDeliveryClient from './cash-on-delivery-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Cash on Delivery (COD) - How It Works | HTG",
    description: "Learn about Cash on Delivery (COD) at HTG. Pay for your order in cash upon delivery. See the process, fees, and details for Pakistan-wide shipping.",
    openGraph: {
        title: "Cash on Delivery (COD) - How It Works",
        description: "Learn about Cash on Delivery (COD) at HTG. Pay for your order in cash upon delivery. See the process, fees, and details for Pakistan-wide shipping.",
        url: "/cash-on-delivery",
    }
};

export default function CashOnDeliveryPage() {
    return (
        <Suspense fallback={<Loading />}>
            <CashOnDeliveryClient />
        </Suspense>
    );
}
