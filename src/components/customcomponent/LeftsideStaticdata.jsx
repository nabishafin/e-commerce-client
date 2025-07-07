import salesbanner from "../../assets/sales.webp";
const LeftsideStaticdata = () => {
  return (
    <div className="space-y-2">
      <div className="hidden s lg:block p-4 bg-black text-white rounded-md shadow">
        <h3 className="text-lg font-semibold mb-2">🎉 Special Offer</h3>
        <p className="text-sm">
          Get <span className="font-bold text-yellow-300">20% OFF</span> on your
          first order! Use code:
          <span className="font-mono bg-yellow-300 text-black px-2 py-0.5 ml-1 rounded">
            WELCOME20
          </span>
        </p>
      </div>

      {/* 🏷️ Categories */}
      <div className="hidden lg:block p-4 bg-white border rounded-md shadow-sm">
        <h3 className="text-base font-semibold mb-3 text-gray-700">
          🔥 Popular Categories
        </h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="hover:text-black cursor-pointer">Electronics</li>
          <li className="hover:text-black cursor-pointer">Fashion</li>
          <li className="hover:text-black cursor-pointer">Home & Living</li>
          <li className="hover:text-black cursor-pointer">Beauty</li>
          <li className="hover:text-black cursor-pointer">Toys</li>
        </ul>
      </div>

      {/* 🚚 Shipping Info */}
      <div className="hidden lg:block p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-900 shadow-sm">
        <h3 className="text-sm font-medium mb-1">🚚 Free Shipping</h3>
        <p className="text-xs">
          Enjoy free shipping on orders over{" "}
          <span className="font-semibold">$50</span>. Delivered within 3-5 days.
        </p>
      </div>

      <div className="hidden lg:block">
        <img
          src={salesbanner}
          alt="Sale Banner"
          className="rounded-md w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LeftsideStaticdata;
