import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
            >
              BlogSpace
            </Link>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Discover thoughtful articles, deep insights, and compelling
              stories that inspire and inform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 flex gap-4">
              <li>
                <Link
                  href="/"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-slate-300 hover:text-blue-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm flex items-center">
              © 2024/2025 InfoSpace. Made by ALABERE with{" "}
              <Heart className="w-4 h-4 mx-1 text-red-500" /> for readers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/terms"
                className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/privacy"
                className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/cookies"
                className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
