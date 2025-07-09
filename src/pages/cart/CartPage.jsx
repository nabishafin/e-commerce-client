import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Tag,
} from "lucide-react";
import CheckoutModal from "../../components/customcomponent/CheckoutModal.jsx";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const shippingCost = totalAmount >= 1000 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Number.parseInt(newQuantity);
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 md:px-10 mx-auto py-6 sm:py-8 ">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <Badge variant="secondary" className="ml-2">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 ">
              <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6 " />
              <h2 className="text-2xl font-bold text-gray-600 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button onClick={() => navigate("/")} size="lg">
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
              {/* Cart Items */}
              <div className="lg:col-span-2 mt-4  ">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCart}
                    className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                {items.map((item) => (
                  <Card className="rounded-sm mt-4" key={item._id}>
                    <CardContent className="">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/api/placeholder/96/96"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1 break-words">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-blue-600">
                                ৳{item.price}
                              </span>
                              <span className="text-sm text-gray-500">
                                each
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-col items-end gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveItem(item._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleDecreaseQuantity(item._id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              className="w-14 sm:w-16 h-8 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => handleIncreaseQuantity(item._id)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold">
                              ৳{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-4 lg:top-4 sm:relative sm:top-0 rounded-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Order Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalQuantity} items)</span>
                        <span>৳{totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          Shipping
                        </span>
                        <span
                          className={shippingCost === 0 ? "text-green-600" : ""}
                        >
                          {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                        </span>
                      </div>
                      {totalAmount < 1000 && (
                        <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                          <Tag className="w-4 h-4 inline mr-1" />
                          Add ৳{(1000 - totalAmount).toFixed(2)} more for free
                          shipping!
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ৳{finalTotal.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>

                    <div className="text-xs text-gray-500 text-center">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Secure checkout powered by SSL encryption
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckoutModal}
      />
    </>
  );
};

export default CartPage;
