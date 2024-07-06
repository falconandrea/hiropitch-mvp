import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

interface ClerkButtonProps {
  className: string;
}

export default function ClerkButton({ className }: ClerkButtonProps) {
  return (
    <div className={`clerk-sign-button ${className}`}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Link
          href='/admin/dashboard'
          title=''
          className='hover:text-underline text-white'
        >
          Dashboard
        </Link>
      </SignedIn>
    </div>
  );
}
