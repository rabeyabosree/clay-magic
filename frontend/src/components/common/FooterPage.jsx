import React from "react";

const FooterPage = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
  <div className="container mx-auto px-6 lg:px-20">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* About Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
        <p className="text-sm">
          We provide high-quality, elegant jewelry for every occasion. Our
          mission is to bring timeless beauty to your life.
        </p>
      </div>

      {/* Quick Links Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a href="/shop" className="hover:text-white transition">Shop</a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition">About Us</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </li>
          <li>
            <a href="/faq" className="hover:text-white transition">FAQ</a>
          </li>
        </ul>
      </div>

      {/* Social Media Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="hover:text-white transition">
            Facebook
          </a>
          <a href="https://twitter.com" className="hover:text-white transition">
            Twitter
          </a>
          <a href="https://instagram.com" className="hover:text-white transition">
            Instagram
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="my-8 border-gray-600" />

    {/* Copyright Section */}
    <div className="text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Jewelry Store. All Rights Reserved.
      </p>
    </div>
  </div>
</footer>

  );
};

export default FooterPage;
