import { useState } from "react"
import { ShoppingCart, Home, User, LogOut, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import icon from "../../assets/icon.png"

export function Navbar() {
  const navigate = useNavigate()
  const { totalQuantity } = useSelector((state) => state.cart)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleCartClick = () => {
    navigate("/cart")
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  return (
    <nav className="sticky top-0 z-50 w-full px-2 md:px-10 bg-white text-black  shadow-sm">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo / Title */}
        <Link to={"/"}>
          <div className="flex items-center space-x-4">
            <img src={icon} alt="" />
            <h1 className="text-2xl font-bold hidden md:block ">Mini E-Commerce</h1>
          </div>
        </Link>

        {/* Nav Buttons */}
        <div className="flex items-center space-x-4 relative">
          {/* Home */}
          <Link to={"/"}>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2  hover:bg-gray-100">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCartClick}
            className="relative flex items-center space-x-2  hover:bg-white"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalQuantity > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {totalQuantity}
              </Badge>
            )}
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDropdown}
              className="text-white bg-gray-800 rounded-full"
            >
              <User className="h-5 w-5" />
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link
                      to="/add-product"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Plus className="w-4 h-4" />
                      Add a Product
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        // placeholder for logout
                        setDropdownOpen(false)
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
