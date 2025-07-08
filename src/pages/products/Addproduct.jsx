import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProductMutation } from "../../redux/features/products/productsApi";

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        longDescription: "",
        features: [""],
        rating: "",
        reviewsCount: "",
        stock: true,
        brand: "",
        sku: "",
    });

    const [createProduct, { isLoading, isSuccess, error }] = useCreateProductMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...productData.features];
        newFeatures[index] = value;
        setProductData({ ...productData, features: newFeatures });
    };

    const addFeatureField = () => {
        setProductData({ ...productData, features: [...productData.features, ""] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedProduct = {
            ...productData,
            price: parseFloat(productData.price),
            rating: parseFloat(productData.rating),
            reviewsCount: parseInt(productData.reviewsCount),
            stock: productData.stock === "true" || productData.stock === true,
        };
        createProduct(formattedProduct);
    };

    return (
        <div className=" mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Product Name" value={productData.name} onChange={handleChange} required />
                <Input name="price" type="number" placeholder="Price" value={productData.price} onChange={handleChange} required />
                <Input name="image" placeholder="Image URL" value={productData.image} onChange={handleChange} required />
                <Input name="category" placeholder="Category" value={productData.category} onChange={handleChange} required />
                <Input name="brand" placeholder="Brand" value={productData.brand} onChange={handleChange} />
                <Input name="sku" placeholder="SKU" value={productData.sku} onChange={handleChange} />
                <Textarea name="description" placeholder="Short Description" value={productData.description} onChange={handleChange} required />
                <Textarea name="longDescription" placeholder="Long Description" value={productData.longDescription} onChange={handleChange} />

                {/* Features */}
                <div>
                    <label className="font-semibold">Features</label>
                    {productData.features.map((feature, idx) => (
                        <Input
                            key={idx}
                            placeholder={`Feature ${idx + 1}`}
                            value={feature}
                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                            className="mt-1"
                        />
                    ))}
                    <Button type="button" onClick={addFeatureField} className="mt-2 text-sm">
                        + Add Feature
                    </Button>
                </div>

                <Input
                    name="rating"
                    type="number"
                    step="0.1"
                    placeholder="Rating"
                    value={productData.rating}
                    onChange={handleChange}
                />

                <Input
                    name="reviewsCount"
                    type="number"
                    placeholder="Reviews Count"
                    value={productData.reviewsCount}
                    onChange={handleChange}
                />

                <select
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Product"}
                </Button>

                {isSuccess && <p className="text-green-500">Product added successfully!</p>}
                {error && <p className="text-red-500">Failed to add product.</p>}
            </form>
        </div>
    );
};

export default AddProduct;
