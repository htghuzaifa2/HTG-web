import { Metadata } from 'next';
import FaqClient from './faq-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions | HTG",
    description: "Find answers to common questions about HTG. Learn about shipping, payments, returns, and how to place an order. Your questions, answered.",
    openGraph: {
        title: "FAQ - Frequently Asked Questions | HTG",
        description: "Find answers to common questions about HTG. Learn about shipping, payments, returns, and how to place an order. Your questions, answered.",
        url: "/faq",
    }
};

export default function FaqPage() {
    return (
        <Suspense fallback={<Loading />}>
            <FaqClient />
        </Suspense>
    );
}
