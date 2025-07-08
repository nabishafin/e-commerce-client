import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RotateCcw,
  Heart,
  Send,
} from "lucide-react"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gray-950 text-gray-300 mt-9">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 md:px-14 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 text-white">Mini E-Commerce</h3>
            <p className="text-sm leading-relaxed">
              Your trusted online shopping destination. We provide quality products at affordable prices with fast delivery across Bangladesh.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                "About Us",
                "Contact Us",
                "Privacy Policy",
                "Terms & Conditions",
                "FAQ",
                "Size Guide",
                "Shipping Info",
                "Return Policy",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Help Center",
                "Track Your Order",
                "Returns & Exchanges",
                "Bulk Orders",
                "Gift Cards",
                "Student Discount",
                "Affiliate Program",
                "Become a Seller",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Get In Touch</h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>support@miniecommerce.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1" />
                <span>
                  123 Commerce Street <br />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
              <p className="text-sm mb-3">Subscribe for updates and exclusive offers!</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 flex-1"
                  required
                />
                <Button type="submit" size="icon" className="bg-gray-700 hover:bg-gray-600">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Thank you for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          {[
            { icon: Truck, title: "Free Shipping", subtitle: "On orders over ৳1000" },
            { icon: Shield, title: "Secure Payment", subtitle: "100% secure transactions" },
            { icon: RotateCcw, title: "Easy Returns", subtitle: "30-day return policy" },
            { icon: Phone, title: "24/7 Support", subtitle: "Always here to help" },
          ].map(({ icon: Icon, title, subtitle }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">{title}</h4>
                <p className="text-gray-400 text-xs">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; 2024 Mini E-Commerce. All rights reserved.</p>
            <p className="mt-1">Made with ❤️ in Bangladesh</p>
          </div>
          <div className="flex items-center gap-2">
            <span>We Accept:</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                <CreditCard className="w-3 h-3" />
              </div>
              {["M", "V", "B"].map((text, i) => (
                <div
                  key={i}
                  className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center text-xs font-bold"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
