import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

interface ClerkButtonProps {
  className: string;
}

export default function ClerkButton({ className }: ClerkButtonProps) {
  return (
    <div className={className}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
