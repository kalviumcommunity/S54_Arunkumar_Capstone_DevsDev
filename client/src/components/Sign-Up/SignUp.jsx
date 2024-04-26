import { SignUp } from '@clerk/clerk-react';
import { useEffect } from 'react';

export default function SignInComp() {
  useEffect(() => {
    // Prevent scrolling of the background
    document.body.style.overflow = 'hidden';

    // Reset overflow property when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)] backdrop-blur-sm'>
      <div className="rounded-lg shadow-md">
        <SignUp />
      </div>
    </div>
  );
}
