export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🏄 Surf Hub</h3>
            <p className="text-gray-400">
              Your ultimate destination for surf travel stories, tips, and premium gear.
            </p>
          </div>
          
          {/* Blog Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blog</h3>
            <ul className="space-y-2">
              <li>
                <a href="/categories/destinations" className="text-gray-400 hover:text-white transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="/categories/tips-techniques" className="text-gray-400 hover:text-white transition-colors">
                  Tips & Techniques
                </a>
              </li>
              <li>
                <a href="/categories/gear-reviews" className="text-gray-400 hover:text-white transition-colors">
                  Gear Reviews
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-400 hover:text-white transition-colors">
                  Search Articles
                </a>
              </li>
            </ul>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="/shop?category=surfboards" className="text-gray-400 hover:text-white transition-colors">
                  Surfboards
                </a>
              </li>
              <li>
                <a href="/shop?category=wetsuits" className="text-gray-400 hover:text-white transition-colors">
                  Wetsuits
                </a>
              </li>
              <li>
                <a href="/shop?category=accessories" className="text-gray-400 hover:text-white transition-colors">
                  Accessories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact & Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
            <p className="text-gray-400 mb-4 text-sm">
              Follow us for updates, tips, and new products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Surf Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}