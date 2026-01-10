import { Metadata } from 'next';
import ReturnPolicyClient from './return-policy-client';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
    title: "Return & Refund Policy | HTG",
    description: "Review the return and refund policy at HTG. We offer a full refund, including shipping, for damaged, incorrect, or faulty items within 3 days.",
    openGraph: {
        title: "Return & Refund Policy",
        description: "Review the return and refund policy at HTG. We offer a full refund, including shipping, for damaged, incorrect, or faulty items within 3 days.",
        url: "/return-policy",
    }
};

export default function ReturnPolicyPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ReturnPolicyClient />
        </Suspense>
    );
}
