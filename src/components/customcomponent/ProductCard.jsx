"use client"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../../redux/features/cart/cartSlice"
import { Star } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault() // Prevent Link navigation
    e.stopPropagation() // Stop event bubbling

    // Add product to cart
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      }),
    )

    // Navigate to cart page
    navigate("/cart")
  }

  return (
    <Link to={`/singleproducts/${product._id}`}>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow rounded-[5px] ">
        <CardHeader className="p-2 pb-2">
          <div className="aspect-square mb-2 overflow-hidden rounded-md">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover    border-b-[1px] "
            />
          </div>
          <CardTitle className="text-base font-medium px-5 line-clamp-2 text-gray-800">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pt-1 pb-0 flex-1">
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-0.5">{product.description}</p>
          <p className="text-xs text-gray-400">{product.category}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <span className="text-base font-semibold text-green-600">৳{product.price}</span>
          <Button size="sm" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard