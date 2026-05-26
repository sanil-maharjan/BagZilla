"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "../utils/supabase/client";

// ---- Context ----
const ProductContext = createContext(null);

// ---- Provider ----
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const supabase = createClient();

    useEffect(() => {
        // 1. Instantly load from cache if available (Stale-While-Revalidate pattern)
        const cachedProducts = localStorage.getItem("bagzilla_products");
        const cachedOffers = localStorage.getItem("bagzilla_offers");
        
        if (cachedProducts && cachedOffers) {
            setProducts(JSON.parse(cachedProducts));
            setOffers(JSON.parse(cachedOffers));
            setLoading(false); // UI renders instantly
        }

        // 2. Fetch fresh data in the background
        const fetchData = async () => {
            const [productsRes, offersRes] = await Promise.all([
                supabase.from("products").select("*").order("id"),
                supabase.from("offers").select("*").order("id"),
            ]);

            if (productsRes.error) {
                console.error("Error fetching products:", productsRes.error);
            } else {
                const normalized = (productsRes.data || []).map(p => ({
                    ...p,
                    price: Number(p.price),
                    rating: Number(p.rating),
                }));
                setProducts(normalized);
                localStorage.setItem("bagzilla_products", JSON.stringify(normalized)); // Update cache
            }

            if (offersRes.error) {
                console.error("Error fetching offers:", offersRes.error);
            } else {
                setOffers(offersRes.data || []);
                localStorage.setItem("bagzilla_offers", JSON.stringify(offersRes.data || [])); // Update cache
            }

            setLoading(false);
        };
        fetchData();
    }, []);

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

    const getRecommendations = (currentProductId, limit = 3) => {
        const currentProduct = products.find((p) => p.id === currentProductId);
        if (!currentProduct) return [];
        return products
            .filter((p) => p.id !== currentProductId)
            .map((p) => ({
                ...p,
                score:
                    (p.tags || []).filter((t) => (currentProduct.tags || []).includes(t)).length +
                    (p.category === currentProduct.category ? 2 : 0),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    };

    // ---- Value ----
    const value = {
        // Data
        products,
        offers,
        loading,
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
