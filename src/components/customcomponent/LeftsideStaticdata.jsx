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
        <h3 className="text-base font-semibold mb-3 text-gray-700">🔥 Popular Categories</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="relative overflow-hidden cursor-pointer group">
            <span className="relative z-10 block py-1 px-2 transition-colors duration-300 group-hover:text-white">
              Electronics
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </li>
          <li className="relative overflow-hidden cursor-pointer group">
            <span className="relative z-10 block py-1 px-2 transition-colors duration-300 group-hover:text-white">
              Fashion
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </li>
          <li className="relative overflow-hidden cursor-pointer group">
            <span className="relative z-10 block py-1 px-2 transition-colors duration-300 group-hover:text-white">
              Home & Living
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </li>
          <li className="relative overflow-hidden cursor-pointer group">
            <span className="relative z-10 block py-1 px-2 transition-colors duration-300 group-hover:text-white">
              Beauty
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </li>
          <li className="relative overflow-hidden cursor-pointer group">
            <span className="relative z-10 block py-1 px-2 transition-colors duration-300 group-hover:text-white">
              Toys
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </li>
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
