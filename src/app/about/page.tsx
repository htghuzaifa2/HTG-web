import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
    title: "About HTG - Premium Fashion Brand Story",
    description: "Discover HTG's journey in bringing premium Sialkot craftsmanship to the world. We specialize in high-quality hoodies, tracksuits, and gaming apparel.",
    openGraph: {
        title: "About HTG - Premium Fashion Brand Story",
        description: "Discover HTG's journey in bringing premium Sialkot craftsmanship to the world. We specialize in high-quality hoodies, tracksuits, and gaming apparel.",
        url: "/about",
    }
};

export default function AboutPage() {
    return <AboutClient />;
}
