import { Link, Outlet } from "react-router-dom";
import "./rootLayout.scss";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Logo from '../../../public/logo2.png'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="rootLayout">
        <header>
          <Link to="/" className="logo">
            <img src={Logo} alt="" />

            <span>SmartAI</span>
          </Link>
          <div className="user">
            
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
