import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

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
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
