import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";
import { addToCart, openCart } from "../../redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, Heart, Share2, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast"; // অথবা আপনার preferred toast library

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const { items } = useSelector((state) => state.cart);

  // Check if product is already in cart
  const isInCart = items.some(item => item._id === product?._id);
  const cartItem = items.find(item => item._id === product?._id);

  useEffect(() => {
    if (product) {
      console.log("Product Data:", product);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      }));

      // Show success toast
      toast.success(`${product.name} added to cart!`);

      // Optional: Open cart sidebar
      dispatch(openCart());
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Add to cart first
      dispatch(addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      }));

      // Open cart for checkout
      dispatch(openCart());
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image || "/api/placeholder/600/600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail images could go here */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 124 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <Badge variant="destructive">-{product.discount}%</Badge>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            {product.features && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1"
                  variant={isInCart ? "outline" : "default"}
                  disabled={isInCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInCart ? `Added (${cartItem?.quantity})` : 'Add to Cart'}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1"
                  variant="default"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">SKU:</span>
                  <span className="ml-2 text-gray-600">{product._id}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-gray-600">{product.category || 'General'}</span>
                </div>
                <div>
                  <span className="font-medium">Brand:</span>
                  <span className="ml-2 text-gray-600">{product.brand || 'No Brand'}</span>
                </div>
                <div>
                  <span className="font-medium">Warranty:</span>
                  <span className="ml-2 text-gray-600">{product.warranty || '1 Year'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;