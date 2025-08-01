import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-50 p-5">
      <footer className="bg-white rounded-lg shadow-sm max-w-6xl mx-auto p-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Useful Links */}
          <div>
            <h3 className="text-gray-800 font-semibold text-base mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Security</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <div className="mb-6">
              <ul className="space-y-2 mt-8">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Partner</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Franchise</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Seller</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Warehouse</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Deliver</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Resources</a></li>
              </ul>
            </div>
          </div>

          {/* Third Column */}
          <div>
            <div className="mb-6">
              <ul className="space-y-2 mt-8">
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Recipes</a></li>
                <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Bistro</a></li>
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-gray-800 font-semibold text-base">Categories</h3>
              <a href="#" className="text-green-600 text-sm hover:underline cursor-pointer">see all</a>
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Vegetables & Fruits</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Cold Drinks & Juices</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Bakery & Biscuits</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Dry Fruits, Masala & Oil</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Paan Corner</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Pharma & Wellness</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Ice Creams & Frozen Desserts</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Beauty & Cosmetics</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Stationery Needs</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Print Store</a></li>
            </ul>
          </div>
        </div>

        {/* Additional Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Dairy & Breakfast</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Instant & Frozen Food</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Sweet Tooth</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Sauces & Spreads</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Organic & Premium</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Cleaning Essentials</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Personal Care</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Fashion & Accessories</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Books</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">E-Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Munchies</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Tea, Coffee & Health Drinks</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Atta, Rice & Dal</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Chicken, Meat & Fish</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Baby Care</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Home & Office</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Pet Care</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Electronics & Electricals</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Toys & Games</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Rakhi Gifts</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="text-gray-500 text-xs">
            © Rationseva Commerce Private Limited, 2016-2025
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="text-gray-800 text-sm font-medium">Download App</div>
            
            <div className="flex gap-2">
              {/* App Store Button */}
              <a href="#" className="cursor-pointer">
                <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-1 text-xs">
                  <span className="text-lg">📱</span>
                  <div>
                    <div className="text-xs opacity-75">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </a>
              
              {/* Google Play Button */}
              <a href="#" className="cursor-pointer">
                <div className="bg-black text-white px-3 py-1.5 rounded flex items-center gap-1 text-xs">
                  <span className="text-lg">▶️</span>
                  <div>
                    <div className="text-xs opacity-75">GET IT ON</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-sm font-bold">X</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-sm font-bold">📷</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-sm font-bold">in</span>
              </a>
              <a href="#" className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="text-sm">🧵</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-gray-500 text-xs leading-relaxed">
          "RationSeva" is owned & managed by "me(arya)" and is not related, linked or interconnected in whatsoever manner or nature, to "GROFFR.COM" which is a real estate services business operated by "Redstone Consultancy Services Private Limited".
        </div>
      </footer>
    </div>
  );
};

export default Footer;