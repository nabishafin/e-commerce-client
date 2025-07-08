import { ChevronDown, Star } from "lucide-react"

const LeftsideStaticdata = () => {
  const renderStars = (count) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < count ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (

    // fuuly static

    <div className=" p-4 bg-white border-r border-gray-200 space-y-6 rounded-[5px]">
      {/* Department Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Department</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="dept-all" name="department" defaultChecked className="text-blue-600" />
            <label htmlFor="dept-all" className="font-medium">
              All
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="dept-amazon" name="department" className="text-blue-600" />
            <label htmlFor="dept-amazon" className="text-sm text-gray-700">
              Amazon Devices & Accessories
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="dept-appliances" name="department" className="text-blue-600" />
            <label htmlFor="dept-appliances" className="text-sm text-gray-700">
              Appliances
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="dept-arts" name="department" className="text-blue-600" />
            <label htmlFor="dept-arts" className="text-sm text-gray-700">
              Arts, Crafts & Sewing
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="dept-auto" name="department" className="text-blue-600" />
            <label htmlFor="dept-auto" className="text-sm text-gray-700">
              Automotive
            </label>
          </div>
        </div>
        <button className="flex items-center text-blue-600 text-sm mt-2 hover:underline">
          <ChevronDown className="w-4 h-4 mr-1" />
          See more
        </button>
      </div>

      {/* Brands Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="brand-samsung" className="text-blue-600" />
            <label htmlFor="brand-samsung" className="text-sm text-gray-700">
              Samsung
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="brand-shark" className="text-blue-600" />
            <label htmlFor="brand-shark" className="text-sm text-gray-700">
              Shark
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="brand-owlet" className="text-blue-600" />
            <label htmlFor="brand-owlet" className="text-sm text-gray-700">
              Owlet
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="brand-crest" className="text-blue-600" />
            <label htmlFor="brand-crest" className="text-sm text-gray-700">
              Crest
            </label>
          </div>
        </div>
        <button className="flex items-center text-blue-600 text-sm mt-2 hover:underline">
          <ChevronDown className="w-4 h-4 mr-1" />
          See more
        </button>
      </div>

      {/* Customer Reviews Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Customer Reviews</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input type="radio" id="review-all" name="reviews" defaultChecked className="text-blue-600" />
            <label htmlFor="review-all" className="font-medium">
              All
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="review-4up" name="reviews" className="text-blue-600" />
            <label htmlFor="review-4up" className="flex items-center gap-2 text-sm text-gray-700">
              {renderStars(4)}
              <span>& up</span>
            </label>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price</h3>
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">$0 – $2,700</div>
          <div className="relative">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2"></div>
            <div className="absolute right-0 top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 -mr-2"></div>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Discount</h3>
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">0% – 100%</div>
          <div className="relative">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 -ml-2"></div>
            <div className="absolute right-0 top-0 w-4 h-4 bg-blue-600 rounded-full -mt-1 -mr-2"></div>
          </div>
        </div>
      </div>

      {/* Prime Programs Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Prime Programs</h3>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="prime-exclusive" className="text-blue-600" />
          <label htmlFor="prime-exclusive" className="text-sm text-gray-700">
            Prime Exclusive
          </label>
        </div>
      </div>
    </div>
  )
}

export default LeftsideStaticdata