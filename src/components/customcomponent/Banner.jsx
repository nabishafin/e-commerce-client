import { ArrowRight } from "lucide-react";

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing Products
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Shop the latest trends and find everything you need in one place.
              Quality products, great prices, and fast delivery.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2">
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden lg:block">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Shopping Banner"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
