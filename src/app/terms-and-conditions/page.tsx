import type { Metadata } from 'next';
import TermsAndConditionsClient from './terms-and-conditions-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Terms & Conditions - HTG",
    description: "Read our terms and conditions to understand the rules and guidelines for using HTG. We aim to provides a fair and transparent experience for all customers.",
    openGraph: {
        title: "Terms & Conditions - HTG",
        description: "Read our terms and conditions to understand the rules and guidelines for using HTG. We aim to provides a fair and transparent experience for all customers.",
        url: "/terms-and-conditions",
    }
};

export default function TermsAndConditionsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <TermsAndConditionsClient />
        </Suspense>
    );
}
