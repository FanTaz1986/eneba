import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-eneba-dark text-gray-300 mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 text-eneba-blue">About ENEBA</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-eneba-blue transition">About us</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Contact us</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Careers</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 text-eneba-blue">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-eneba-blue transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">How to buy</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Returns & Refunds</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Support Ticket</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 text-eneba-blue">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-eneba-blue transition">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Cookie Policy</Link></li>
              <li><Link to="#" className="hover:text-eneba-blue transition">Return Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 text-eneba-blue">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none focus:bg-gray-600 text-sm transition"
              />
              <button className="bg-eneba-blue hover:bg-blue-700 px-4 py-2 rounded-r transition font-semibold">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © 2026 ENEBA. All rights reserved. | Made with ❤️
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              <Link to="#" className="text-gray-400 hover:text-eneba-blue transition">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-eneba-blue transition">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-eneba-blue transition">
                <Instagram size={20} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-4 text-xs mt-4 md:mt-0">
              <span className="text-gray-400">🔒 Secure</span>
              <span className="text-gray-400">✓ Verified</span>
              <span className="text-gray-400">⭐ Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
