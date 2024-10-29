import { Facebook, Twitter, Instagram, Mail, Bird } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white shadow-lg mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Bird className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-600">Birdwatcher.ai</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Birdwatcher.ai is an advanced AI-powered bird identification platform that helps nature enthusiasts
              identify birds through images. Our mission is to connect people with nature by making bird watching
              more accessible and educational for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-blue-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Birdwatcher.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}