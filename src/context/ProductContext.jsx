import { createContext, useContext, useState } from "react";
import { products, getRecommendations } from "../data/products";

// ---- Context ----
const ProductContext = createContext(null);

// ---- Provider ----
export function ProductProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    // ---- Cart helpers ----
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const cartTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // ---- Wishlist helpers ----
    const toggleWishlist = (product) => {
        setWishlist((prev) =>
            prev.find((item) => item.id === product.id)
                ? prev.filter((item) => item.id !== product.id)
                : [...prev, product]
        );
    };

    const isWishlisted = (productId) =>
        wishlist.some((item) => item.id === productId);

    // ---- Product helpers ----
    const getProductById = (id) => products.find((p) => p.id === id) || null;

    const getByCategory = (category) =>
        category === "All"
            ? products
            : products.filter((p) => p.category === category);

    const categories = ["All", ...new Set(products.map((p) => p.category))];

    // ---- Value ----
    const value = {
        // Data
        products,
        categories,
        // Product helpers
        getProductById,
        getByCategory,
        getRecommendations,
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        // Wishlist
        wishlist,
        toggleWishlist,
        isWishlisted,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}

// ---- Hook ----
export function useProducts() {
    const ctx = useContext(ProductContext);
    if (!ctx) {
        throw new Error("useProducts must be used inside <ProductProvider>");
    }
    return ctx;
}
