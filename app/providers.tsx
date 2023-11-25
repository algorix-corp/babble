'use client'

import { SessionProvider } from 'next-auth/react'; // TODO - might be unnecessary
import { NextUIProvider } from '@nextui-org/react'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <NextTopLoader />
                <Toaster />

                {children}
            </NextUIProvider>
        </SessionProvider>
    )
}