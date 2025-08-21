'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
          Assignment Portal
        </Link>
        <div className="space-x-4">
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-blue-200 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}