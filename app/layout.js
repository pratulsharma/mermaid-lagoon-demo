import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Mermaidalay | Mermaid Lagoon Experience',
  description: 'Premium inflatable mermaid lagoon rentals, tails, décor and magical event experiences in California.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
