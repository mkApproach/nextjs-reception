import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts'
import {NextAuthProvider} from "@/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
