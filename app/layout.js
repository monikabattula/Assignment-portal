import AuthProvider from './provider';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Assignment Submission Portal',
  description: 'Assignment Submission Portal for Programming Hero',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}