import { Baloo_2, Fredoka, Quicksand, Nunito_Sans } from 'next/font/google';
import './globals.css';

const baloo2 = Baloo_2({ 
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-baloo2',
  display: 'swap'
});

const fredoka = Fredoka({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fredoka',
  display: 'swap'
});

const quicksand = Quicksand({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-quicksand',
  display: 'swap'
});

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap'
});

export const metadata = {
  title: 'Mermaidalay | Mermaid Lagoon Experience',
  description: 'Premium inflatable mermaid lagoon rentals, tails, décor and magical event experiences in California.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo2.variable} ${fredoka.variable} ${quicksand.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
