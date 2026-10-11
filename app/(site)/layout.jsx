import './site.css';

export const metadata = {
  title: 'Connect 4 Digital Tech — the backend team your agency never hired',
  description: 'Tracking, data, reporting and automation for digital marketing agencies — white-labelled under your brand.',
  icons: { icon: '/favicon.svg' }
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
