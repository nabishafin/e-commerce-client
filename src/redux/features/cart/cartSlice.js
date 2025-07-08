import { createSlice } from "@reduxjs/toolkit"

// localStorage helpers
const loadCartFromStorage = () => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return []

    try {
        const serializedCart = localStorage.getItem("cart")
        return serializedCart ? JSON.parse(serializedCart) : []
    } catch (error) {
        console.error("Error loading cart from localStorage:", error)
        return []
    }
}

const saveCartToStorage = (cartItems) => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    try {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    } catch (error) {
        console.error("Error saving cart to localStorage:", error)
    }
}

const initialState = {
    items: loadCartFromStorage(),
    isCartOpen: false,
    totalAmount: 0,
    totalQuantity: 0,
}

// Calculate totals
const calculateTotals = (items) => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0)
    return { totalQuantity, totalAmount }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        ...initialState,
        ...calculateTotals(initialState.items),
    },
    reducers: {
        addToCart: (state, action) => {
            const { _id, name, price, image, description } = action.payload
            const existingItem = state.items.find((item) => item._id === _id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    _id,
                    name,
                    price,
                    image,
                    description,
                    quantity: 1,
                })
            }

            // Recalculate totals
            const totals = calculateTotals(state.items)
            state.totalQuantity = totals.totalQuantity
            state.totalAmount = totals.totalAmount

            // Save to localStorage
            saveCartToStorage(state.items)
        },

        removeFromCart: (state, action) => {
            const id = action.payload
            state.items = state.items.filter((item) => item._id !== id)

            // Recalculate totals
            const totals = calculateTotals(state.items)
            state.totalQuantity = totals.totalQuantity
            state.totalAmount = totals.totalAmount

            // Save to localStorage
            saveCartToStorage(state.items)
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const existingItem = state.items.find((item) => item._id === id)

            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity
            }

            // Recalculate totals
            const totals = calculateTotals(state.items)
            state.totalQuantity = totals.totalQuantity
            state.totalAmount = totals.totalAmount

            // Save to localStorage
            saveCartToStorage(state.items)
        },

        increaseQuantity: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find((item) => item._id === id)

            if (existingItem) {
                existingItem.quantity += 1
            }

            // Recalculate totals
            const totals = calculateTotals(state.items)
            state.totalQuantity = totals.totalQuantity
            state.totalAmount = totals.totalAmount

            // Save to localStorage
            saveCartToStorage(state.items)
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find((item) => item._id === id)

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
            }

            // Recalculate totals
            const totals = calculateTotals(state.items)
            state.totalQuantity = totals.totalQuantity
            state.totalAmount = totals.totalAmount

            // Save to localStorage
            saveCartToStorage(state.items)
        },

        clearCart: (state) => {
            state.items = []
            state.totalQuantity = 0
            state.totalAmount = 0

            // Clear localStorage safely
            if (typeof window !== "undefined") {
                try {
                    localStorage.removeItem("cart")
                } catch (error) {
                    console.error("Error clearing cart from localStorage:", error)
                }
            }
        },

        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen
        },

        openCart: (state) => {
            state.isCartOpen = true
        },

        closeCart: (state) => {
            state.isCartOpen = false
        },
    },
})

// Export individual actions (this is what your components expect)
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
} = cartSlice.actions

export default cartSlice.reducer
