import { Metadata } from 'next';
import ShippingPolicyClient from './shipping-policy-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Shipping Policy - Pakistan-Wide Delivery | HTG",
    description: "Learn about HTG's shipping policy. We offer a flat delivery rate across Pakistan with an estimated delivery time of 7-11 business days.",
    openGraph: {
        title: "Shipping Policy - Pakistan-Wide Delivery | HTG",
        description: "Learn about HTG's shipping policy. We offer a flat delivery rate across Pakistan with an estimated delivery time of 7-11 business days.",
        url: "/shipping-policy",
    }
};

export default function ShippingPolicyPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ShippingPolicyClient />
        </Suspense>
    );
}
