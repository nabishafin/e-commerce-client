import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, closeCart } from "../../redux/features/cart/cartSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { CreditCard, User, MapPin, CheckCircle, Loader2 } from "lucide-react"

const CheckoutModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)
    const [orderId, setOrderId] = useState("")

    // Calculate shipping (free shipping over ৳1000)
    const shippingCost = totalAmount >= 1000 ? 0 : 50
    const finalTotal = totalAmount + shippingCost

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const generateOrderId = () => {
        return "ORD-" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase()
    }

    // Fake API call simulation
    const simulateOrderAPI = async (orderData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    orderId: generateOrderId(),
                    message: "Order placed successfully!",
                })
            }, 2000) // Simulate 2 second API call
        })
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
        setIsProcessing(true)

        try {
            // Prepare order data
            const orderData = {
                customer: formData,
                items: items,
                totalAmount: finalTotal,
                totalQuantity: totalQuantity,
                shippingCost: shippingCost,
                orderDate: new Date().toISOString(),
            }

            // Simulate API call
            const response = await simulateOrderAPI(orderData)

            if (response.success) {
                setOrderId(response.orderId)
                setOrderSuccess(true)

                // Clear cart after successful order
                setTimeout(() => {
                    dispatch(clearCart())
                    dispatch(closeCart())
                }, 3000)
            }
        } catch (error) {
            console.error("Order submission failed:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleCloseModal = () => {
        if (!isProcessing) {
            setFormData({ name: "", email: "", address: "", phone: "" })
            setOrderSuccess(false)
            setOrderId("")
            onClose()
        }
    }

    // Order Success View
    if (orderSuccess) {
        return (
            <Dialog open={isOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="sm:max-w-md">
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</DialogTitle>
                        <DialogDescription className="text-gray-600 mb-4">
                            Thank you for your purchase. Your order has been confirmed.
                        </DialogDescription>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <p className="text-sm text-gray-600">Order ID</p>
                            <p className="font-mono font-bold text-lg">{orderId}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            You will receive a confirmation email shortly. Your cart will be cleared automatically.
                        </p>
                        <Button onClick={handleCloseModal} className="w-full">
                            Continue Shopping
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    // Checkout Form View
    return (
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Checkout
                    </DialogTitle>
                    <DialogDescription>Please fill in your details to complete your order.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Customer Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                    disabled={isProcessing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    required
                                    disabled={isProcessing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    disabled={isProcessing}
                                />
                            </div>

                            <div>
                                <Label htmlFor="address">Delivery Address *</Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your complete delivery address"
                                    required
                                    disabled={isProcessing}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Order Summary
                        </h3>

                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Items ({totalQuantity})</span>
                                <span>৳{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Shipping</span>
                                <span className={shippingCost === 0 ? "text-green-600" : ""}>
                                    {shippingCost === 0 ? "FREE" : `৳${shippingCost}`}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span className="text-blue-600">৳{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Items Preview */}
                        <div className="max-h-32 overflow-y-auto space-y-2">
                            {items.map((item) => (
                                <div key={item._id} className="flex items-center gap-3 text-sm">
                                    <img
                                        src={item.image || "/api/placeholder/40/40"}
                                        alt={item.name}
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium truncate">{item.name}</p>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-semibold">৳{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button type="button" variant="outline" onClick={handleCloseModal} disabled={isProcessing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isProcessing} className="flex-1">
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    Place Order (৳{finalTotal.toFixed(2)})
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutModal