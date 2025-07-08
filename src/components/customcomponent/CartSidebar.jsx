import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} from "../../redux/features/cart/cartSlice"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react"
import CheckoutModal from "./CheckoutModal.jsx"


const CartSidebar = () => {
    const dispatch = useDispatch()
    const { items, isCartOpen, totalAmount, totalQuantity } = useSelector((state) => state.cart)

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id))
    }

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleCloseCart = () => {
        dispatch(closeCart())
    }

    const handleCheckout = () => {
        setIsCheckoutModalOpen(true)
    }

    const handleCloseCheckoutModal = () => {
        setIsCheckoutModalOpen(false)
    }

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={handleCloseCart} />
            )}

            {/* Cart Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">Shopping Cart</h3>
                        <Badge variant="secondary" className="ml-2">
                            {totalQuantity}
                        </Badge>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleCloseCart} className="h-8 w-8">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-gray-500">Your cart is empty</p>
                            <p className="text-sm text-gray-400 mt-2">Add items to get started</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    {/* Product Image */}
                                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image || "/api/placeholder/64/64"}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                        <p className="text-sm text-blue-600 font-semibold mt-1">৳{item.price}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 bg-transparent"
                                                onClick={() => handleDecreaseQuantity(item._id)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 bg-transparent"
                                                onClick={() => handleIncreaseQuantity(item._id)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Actions & Total */}
                                    <div className="flex flex-col items-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleRemoveItem(item._id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <p className="text-sm font-semibold">৳{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}

                            <Separator />

                            {/* Clear Cart Button */}
                            <Button
                                variant="outline"
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                                onClick={handleClearCart}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-xl font-bold text-blue-600">৳{totalAmount.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </div>

            {/* Checkout Modal */}
            <CheckoutModal isOpen={isCheckoutModalOpen} onClose={handleCloseCheckoutModal} />
        </>
    )
}

export default CartSidebar