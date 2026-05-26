import '../index.css';
import NextTopLoader from 'nextjs-toploader';
import ClientLayout from '@/app/_components/ClientLayout';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';

export const metadata = {
  title: 'BagZilla - Premium Handbags & Backpacks Store',
  description: 'Shop luxury bags, purses, and professional backpacks with easy payment options.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextTopLoader
          color="var(--brand-primary, #4f46e5)"
          height={3}
          showSpinner={false}
          shadow="0 0 10px var(--brand-primary, #4f46e5), 0 0 5px var(--brand-primary, #4f46e5)"
        />
        <AuthProvider>
          <ProductProvider>
            <ClientLayout>{children}</ClientLayout>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
