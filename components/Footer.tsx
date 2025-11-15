export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🏄 Surf Shop</h3>
            <p className="text-gray-400">
              Premium surf gear and equipment for riders of all levels. Quality products, expert advice, and fast shipping.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop All Products
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
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <p className="text-gray-400 mb-4">
              Questions? We're here to help! Contact our team for product recommendations and support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Surf Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}