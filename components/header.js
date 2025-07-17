"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Component from "./modal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      // window.location.pathname = "/login";
      router.push("/login");
      console.log("done");
    });
  };

  return (
    <header className="fixed top-0 w-full bg-white backdrop-blur-md border-b border-slate-200/50 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <img src="/au-logo.jpg" />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuth ? (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </Button>
              </Link>
            ) : (
              <>
                {/* <Link href="/createpost"> Create-Post </Link> */}
                <Component />
                <Button variant="secondary" onClick={signUserOut}>
                  {isAuth ? (
                    <>
                      <LogOut />
                      Log Out
                    </>
                  ) : (
                    <>
                      <LogIn />
                      LogIn
                    </>
                  )}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" color="white" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="pt-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
