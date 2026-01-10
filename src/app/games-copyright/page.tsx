import type { Metadata } from 'next';
import GamesCopyrightClient from './games-copyright-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Games Copyright & Disclaimer - HTG",
    description: "Information about embedded games on HTG. We do not own these games - they are embedded from the internet. Contact us for any copyright concerns or removal requests.",
    openGraph: {
        title: "Games Copyright & Disclaimer - HTG",
        description: "Information about embedded games on HTG. We do not own these games - they are embedded from the internet. Contact us for any copyright concerns or removal requests.",
        url: "/games-copyright",
    }
};

export default function GamesCopyrightPage() {
    return (
        <Suspense fallback={<Loading />}>
            <GamesCopyrightClient />
        </Suspense>
    );
}
