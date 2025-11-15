export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🏄 Surf Travel</h3>
            <p className="text-gray-400">
              Your ultimate guide to surf destinations, techniques, and gear reviews from expert surfers around the globe.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-gray-400 mb-4">
              Follow us for the latest surf travel updates and tips.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {currentYear} Surf Travel Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}