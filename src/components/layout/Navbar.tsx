import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          StyleStore
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/favorites" className="hover:text-accent transition-colors">
            <Heart className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="hover:text-accent transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          <Link to="/account">
            <Button variant="ghost" className="hover:text-accent">
              <User className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;