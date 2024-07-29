import '@styles/globals.css';
import { Nav } from '@components/Nav'
import { Provider } from '@components/Provider';
import { Suspense } from 'react';

export const metadata = {
    title: "W Prompts",
    description: "Discover & Share Quality AI Prompts"
}

export default function Rootlayout({ children }) {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className="main">
                <div className="gradient" />
            </div>
            <main className='app'>
                <Nav />
                <Suspense fallback={null}>
                {children}
                </Suspense>
            </main>
            </Provider>
        </body>
    </html>
  )
}
