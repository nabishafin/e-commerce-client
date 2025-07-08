import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  // 🔍 console log to see full product data
  useEffect(() => {
    if (product) {
      console.log("Product Data:", product);
    }
  }, [product]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Error fetching product data.</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* আপনি চাইলে এখানে image, price, features etc. দেখাতে পারেন */}
    </div>
  );
};

export default ProductDetailsPage;
