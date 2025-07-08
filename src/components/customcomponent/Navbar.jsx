import { ShoppingCart, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export function Navbar({ onHomeClick }) {
  const navigate = useNavigate()
  const { totalQuantity } = useSelector((state) => state.cart)

  const handleCartClick = () => {
    navigate("/cart")
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-10 bg-gray-950/10 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo / Title */}
        <Link to={"/"}>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Mini E-Commerce</h1>
          </div>
        </Link>

        {/* Nav Buttons */}
        <div className="flex items-center space-x-4">
          {/* Home Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onHomeClick}
            className="flex items-center space-x-2 text-white hover:bg-gray-100"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>

          {/* Cart Button with Badge */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCartClick}
            className="relative flex items-center space-x-2 text-white hover:bg-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>

            {totalQuantity > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {totalQuantity}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </nav>
  )
}
