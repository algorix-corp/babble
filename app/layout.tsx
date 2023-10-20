import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import localFont from 'next/font/local';

const suitFont = localFont({
    src: '../public/fonts/SUIT-Variable.woff2',
    display: 'swap',
    variable: '--font-suit'
})

export const metadata: Metadata = {
    title: 'Babble',
    description: 'Empowering students with AI-driven brainstorming and essay writing support.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`dark ${suitFont.className}`}>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
