import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { baseURL } from '@/BaseUrl';

function EditVendorProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    unit: '',
    discount: '',
    description: '',
    categoryName: '',
    subCategoryName: '',
  });

  // 1. Fetch existing product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${baseURL}api/vendor/product/${productId}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setFormData({
          name: data.name || '',
          stock: data.stock || '',
          unit: data.unit || '',
          discount: data.discount || '',
          description: data.description || '',
          categoryName: data.category?.name || '',
          subCategoryName: data.subCategory?.name || '',
        });
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    }

    fetchProduct();
  }, [productId]);

  // 2. Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseURL}api/${productId}/update-product`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        alert('Product updated!');
        navigate('/vendor/dashboard');
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border w-full p-2 rounded" />

        <input type="number" placeholder="Stock" value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="border w-full p-2 rounded" />

        <input type="text" placeholder="Unit" value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          className="border w-full p-2 rounded" />

        <input type="number" placeholder="Discount (%)" value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          className="border w-full p-2 rounded" />

        <textarea placeholder="Description" value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="border w-full p-2 rounded" />

        <input type="text" placeholder="Category Name" value={formData.categoryName}
          onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
          className="border w-full p-2 rounded" />

        <input type="text" placeholder="Subcategory Name" value={formData.subCategoryName}
          onChange={(e) => setFormData({ ...formData, subCategoryName: e.target.value })}
          className="border w-full p-2 rounded" />

        <button type="submit" className="bg-[#54B226] text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditVendorProduct;
