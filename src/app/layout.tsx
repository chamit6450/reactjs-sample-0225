import './globals.css';
import { Web3Provider } from '@/lib/Web3Context';
import { TaskProvider } from '@/lib/TaskContext';
import Navbar from '@/components/Navbar';

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
    <html lang="en" className="dark">
      <body className="font-mono bg-background text-foreground antialiased">
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
