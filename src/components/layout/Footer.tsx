import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm opacity-80">
            StyleStore offers premium fashion with exceptional quality and style.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="text-sm opacity-80 hover:opacity-100">
                Products
              </Link>
            </li>
            <li>
              <Link to="/account" className="text-sm opacity-80 hover:opacity-100">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/orders" className="text-sm opacity-80 hover:opacity-100">
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm opacity-80">
            Email: support@stylestore.com<br />
            Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;