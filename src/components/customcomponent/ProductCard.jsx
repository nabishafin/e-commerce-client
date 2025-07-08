import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // replace with your UI library path
import { Button } from "@/components/ui/button"; // replace with your UI button path
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Link to={`/singleproducts/${product._id}`}>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow rounded-sm">
        <CardHeader className="p-3 pb-2">
          <div className="aspect-square mb-2 overflow-hidden rounded-md">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardTitle className="text-base font-medium line-clamp-2 text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 pt-1 pb-0 flex-1">
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 mb-0.5">
            {product.description}
          </p>
          <p className="text-xs text-gray-400">{product.category}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="text-base font-semibold text-green-600">
            ${product.price}
          </span>
          <Button size="sm" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
