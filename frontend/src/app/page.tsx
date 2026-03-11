'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/login');
    }, [router]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading LendFlow...</p>
        </div>
    );
}
