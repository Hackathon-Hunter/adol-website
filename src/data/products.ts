export type Product = {
    id: number;
    title: string;
    price: string;
    minPrice: string;
    status: "Live" | "Draft" | "Sold";
    image: string;
    marketplace: string;
    updated: string;
    description?: string;
    category?: string;
    condition?: string;
    location?: string;
    views?: number;
    messages?: number;
    likes?: number;
    rating?: number;
    seller?: string;
};

export const products: Product[] = [
    {
        id: 1,
        title: "Marshall Major IV Bluetooth Headphones",
        price: "Rp 1,850,000",
        minPrice: "Rp 1,600,000",
        status: "Live",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Marshall_Major_IV.jpg",
        marketplace: "Facebook Marketplace",
        updated: "2 hours ago",
        description: "Premium wireless headphones with exceptional sound quality. Perfect for music lovers and professionals. Includes original packaging and charging cable.",
        category: "Electronics",
        condition: "Like New",
        location: "Jakarta, Indonesia",
        views: 145,
        messages: 12,
        likes: 28,
        rating: 4.8,
        seller: "Tech Store Jakarta"
    },
    {
        id: 2,
        title: "Nike Air Max 97 Silver Bullet",
        price: "Rp 2,300,000",
        minPrice: "Rp 2,000,000",
        status: "Live",
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fc2d86b1-97bb-41de-bfe4-cc8d98efb725/air-max-97-shoes-JXw9pm.png",
        marketplace: "Facebook Marketplace",
        updated: "5 hours ago",
        description: "Authentic Nike Air Max 97 in excellent condition. Only worn a few times. Size 42. Comes with original box.",
        category: "Fashion",
        condition: "Excellent",
        location: "Bandung, Indonesia",
        views: 89,
        messages: 7,
        likes: 15,
        rating: 4.9,
        seller: "Sneaker Collection"
    },
    {
        id: 3,
        title: "iPhone 12 Pro Max 256GB Pacific Blue",
        price: "Rp 12,000,000",
        minPrice: "Rp 11,500,000",
        status: "Draft",
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-iphone-12-pro-max-blue-2020?wid=1144&hei=1144&fmt=jpeg",
        marketplace: "-",
        updated: "yesterday",
        description: "iPhone 12 Pro Max in pristine condition. 256GB storage, Pacific Blue color. Battery health 92%. No scratches or dents.",
        category: "Electronics",
        condition: "Excellent",
        location: "Surabaya, Indonesia",
        views: 0,
        messages: 0,
        likes: 0,
        rating: 5.0,
        seller: "Mobile World"
    },
    {
        id: 4,
        title: "Vintage Leather Jacket",
        price: "Rp 750,000",
        minPrice: "Rp 650,000",
        status: "Live",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        marketplace: "Instagram",
        updated: "1 day ago",
        description: "Genuine leather jacket in excellent condition. Classic vintage style perfect for any occasion.",
        category: "Fashion",
        condition: "Good",
        location: "Bandung, Indonesia",
        views: 67,
        messages: 3,
        likes: 12,
        rating: 4.6,
        seller: "Vintage Store"
    },
    {
        id: 5,
        title: "Gaming Laptop ASUS ROG",
        price: "Rp 18,500,000",
        minPrice: "Rp 17,000,000",
        status: "Live",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
        marketplace: "Facebook Marketplace",
        updated: "3 hours ago",
        description: "High-performance gaming laptop with RTX 3070 graphics card. Perfect for gaming and content creation.",
        category: "Electronics",
        condition: "Like New",
        location: "Jakarta, Indonesia",
        views: 156,
        messages: 18,
        likes: 34,
        rating: 4.9,
        seller: "Gaming Hub"
    },
    {
        id: 6,
        title: "Antique Wooden Table",
        price: "Rp 2,500,000",
        minPrice: "Rp 2,200,000",
        status: "Draft",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
        marketplace: "-",
        updated: "1 week ago",
        description: "Beautiful antique wooden dining table. Solid wood construction with intricate carvings.",
        category: "Furniture",
        condition: "Good",
        location: "Yogyakarta, Indonesia",
        views: 0,
        messages: 0,
        likes: 0,
        rating: 4.7,
        seller: "Antique Corner"
    },
    {
        id: 7,
        title: "Samsung Galaxy S22 Ultra",
        price: "Rp 8,500,000",
        minPrice: "Rp 8,000,000",
        status: "Sold",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
        marketplace: "WhatsApp",
        updated: "2 days ago",
        description: "Samsung Galaxy S22 Ultra in mint condition. 256GB storage, comes with S Pen and original box.",
        category: "Electronics",
        condition: "Excellent",
        location: "Surabaya, Indonesia",
        views: 89,
        messages: 0,
        likes: 0,
        rating: 4.8,
        seller: "Mobile Center"
    }
];
