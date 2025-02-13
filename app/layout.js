import {Inter} from 'next/font/google'
import "./globals.css";
import Header from '@/components/header';
import { ClerkProvider } from '@clerk/nextjs';
import CreateEventDrawer from '@/components/create-event';

const inter = Inter({ subsets: ['latin'] });

 
export const metadata = {
  title: "Schedulrr",
  description: "Meeting Scheduling app for customised users",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider> 
    <html lang="en">
      <body
        className={`inter.className}`}
      >
        {/*Header*/}
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">{children}</main>
        {/*Footer*/}
        <footer className="bg-blue-300 text-gray-600 text-center py-4">
          <div>
            <p>Made by Shubham</p>
          </div>
        </footer>
        <CreateEventDrawer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
