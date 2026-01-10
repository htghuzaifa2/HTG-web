
import type { Metadata } from 'next';
import CustomSizeClient from './custom-size-client';

export const metadata: Metadata = {
    title: "Custom Size | HTG - Free Tailoring Service",
    description: "Don't fit into standard sizes? Get custom-sized premium hoodies, tracksuits, and jackets at no extra cost. Tailored to your exact measurements.",
    openGraph: {
        title: "Custom Size | HTG - Free Tailoring Service",
        description: "Don't fit into standard sizes? Get custom-sized premium hoodies, tracksuits, and jackets at no extra cost.",
        url: "/custom-size",
    }
};

export default function CustomSizePage() {
    return <CustomSizeClient />;
}
