import './globals.css';
import { Web3Provider } from '@/lib/Web3Context';
import { TaskProvider } from '@/lib/TaskContext';
import Navbar from '@/components/Navbar';
import { Geist_Mono } from 'next/font/google'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

export const metadata = {
  title: 'Task Board',
  description: 'A Web3-enabled task management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistMono.variable} dark`}>
      <body className="min-h-screen bg-background font-mono antialiased">
        <Web3Provider>
          <TaskProvider>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </TaskProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
