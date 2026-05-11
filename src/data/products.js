// ── Local image imports ───────────────────────────────────────────────────────
import backpack1 from "../assets/images/backpack-1.jpg";
import purse1 from "../assets/images/purse-1.jpg";
import purse2 from "../assets/images/purse-2.jpg";
import womenRedBag from "../assets/images/women-red-bag.jpg";

// ── Products ──────────────────────────────────────────────────────────────────
export const products = [
  {
    id: 1,
    name: "Classic Leather Tote",
    category: "Luxury",
    price: 4500,
    image: purse1,
    description:
      "Handcrafted from premium Italian leather, this tote is perfect for everyday elegance.",
    features: ["Genuine Leather", "Spacious Interior", "Inner Pockets"],
    tags: ["leather", "tote", "office"],
  },
  {
    id: 2,
    name: "Urban Explorer Backpack",
    category: "Backpack",
    price: 3200,
    image: backpack1,
    description:
      "Versatile backpack designed for modern commuters and urban adventurers.",
    features: ["Water Resistant", "15-inch Laptop Sleeve", "Ergonomic Straps"],
    tags: ["backpack", "travel", "waterproof"],
  },
  {
    id: 3,
    name: "Professional Briefcase",
    category: "Office",
    price: 5800,
    image: purse2,
    description:
      "Make a statement with this sophisticated briefcase designed for the modern professional.",
    features: [
      "Padded Laptop Compartment",
      "Premium Hardware",
      "Detachable Shoulder Strap",
    ],
    tags: ["office", "briefcase", "leather"],
  },
  {
    id: 4,
    name: "Compact Crossbody Bag",
    category: "Casual",
    price: 2100,
    image: womenRedBag,
    description:
      "Lightweight and stylish crossbody bag for your daily essentials.",
    features: ["Adjustable Strap", "Compact Design", "Multiple Compartments"],
    tags: ["casual", "crossbody", "travel"],
  },
  {
    id: 5,
    name: "Sleek Handbag",
    category: "Luxury",
    price: 3800,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970c8a?w=500&q=80",
    description: "A timeless design that complements any outfit.",
    features: ["Structured Design", "Gold Hardware", "Premium Lining"],
    tags: ["handbag", "luxury", "party"],
  },
  {
    id: 6,
    name: "Hiking Pro Backpack",
    category: "Backpack",
    price: 4200,
    image: "https://images.unsplash.com/photo-1552308995-2baac1ad5490?w=500&q=80",
    description:
      "Ready for any trail. Durable, comfortable, and packed with features.",
    features: ["Breathable Back", "Multiple Loops", "Reinforced Base"],
    tags: ["backpack", "hiking", "outdoors"],
  },
];

// ── Recommendations ───────────────────────────────────────────────────────────
export const getRecommendations = (currentProductId, limit = 3) => {
  const currentProduct = products.find((p) => p.id === currentProductId);
  if (!currentProduct) return [];

  return products
    .filter((p) => p.id !== currentProductId)
    .map((p) => ({
      ...p,
      score:
        p.tags.filter((t) => currentProduct.tags.includes(t)).length +
        (p.category === currentProduct.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
