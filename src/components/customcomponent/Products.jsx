import React, { useState, useMemo, useEffect } from "react";
import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import LeftsideStaticdata from "./LeftsideStaticdata";
import { useGetProductsQuery } from "../../redux/features/products/productsApi";

const ITEMS_PER_PAGE = 8;

const Products = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    const filtered = products.filter((product) => {
      const name = product?.name || "";
      const category = product?.category || "";
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return (a.name || "").localeCompare(b.name || "");
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-40 text-center">
        <h1 className="text-red-500 text-xl font-semibold">
          Error loading products.
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 px-14">
      <h1 className="text-3xl font-bold mb-2 text-start">
        Discover the Best Deals at TrendShop Today
      </h1>
      <p className="text-muted-foreground text-sm mb-8 max-w-xl">
        Discover trending products, best deals, and smooth shopping experience
        all in one place. Find what you love — fast, easy, and secure.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        <div className="space-y-4 lg:sticky top-24 h-fit">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price (Low to High)</SelectItem>
              <SelectItem value="price-high">Price (High to Low)</SelectItem>
              <SelectItem value="rating">Rating (High to Low)</SelectItem>
            </SelectContent>
          </Select>
          <LeftsideStaticdata />
        </div>

        <div className="lg:col-span-3">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {currentProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="h-full flex flex-col hover:shadow-md transition-shadow rounded-sm"
                  >
                    <CardHeader className="p-3 pb-2">
                      <div className="aspect-square mb-2 overflow-hidden rounded-md">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="text-base font-medium line-clamp-2 text-gray-800">
                        {product.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-3 pt-1 pb-0 flex-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mb-0.5">
                        {product.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.category}
                      </p>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                      <span className="text-base font-semibold text-green-600">
                        ${product.price}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(page)}
                                  isActive={currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        }
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No products found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
