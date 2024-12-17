import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder products data
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 59.99,
      image: "https://via.placeholder.com/300x400",
    },
    {
      id: 3,
      name: "Casual Sneakers",
      price: 79.99,
      image: "https://via.placeholder.com/300x400",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Style
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Shop the latest trends in fashion
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white text-primary"
            />
            <Button>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-accent font-bold">${product.price}</p>
                <Button className="w-full mt-4">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;