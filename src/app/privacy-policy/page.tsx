import type { Metadata } from 'next';
import PrivacyPolicyClient from './privacy-policy-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Privacy Policy - HTG",
    description: "Read our privacy policy to understand how we value your privacy and handle information at HTG. We do not collect any user data.",
    openGraph: {
        title: "Privacy Policy - HTG",
        description: "Read our privacy policy to understand how we value your privacy and handle information at HTG. We do not collect any user data.",
        url: "/privacy-policy",
    }
};

export default function PrivacyPolicyPage() {
    return (
        <Suspense fallback={<Loading />}>
            <PrivacyPolicyClient />
        </Suspense>
    );
}
