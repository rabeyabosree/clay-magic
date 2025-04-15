import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicCheckboxGroup from "./DynamicCheckboxGroup";
import { createProduct } from './../../../redux/reducers/adminSlice';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    isPopular: false,
    isOnSale: false,
    isBOGO: false,
    stock: "",
    image: null,
    message: ""
  });

  const dispatch = useDispatch();
  const { status, message, error } = useSelector((state) => state.products);

  const filterOptions = [
    { name: "isPopular", label: "Popular" },
    { name: "isOnSale", label: "On Sale" },
    { name: "isBOGO", label: "BOGO" },
    { name: "isNew", label: "New" },
    { name: "isExpensive", label: "Expensive" },
    { name: "isTrending", label: "Trending" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file, // Storing the actual file object
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Image is required!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("isPopular", formData.isPopular);
    data.append("isOnSale", formData.isOnSale);
    data.append("isBOGO", formData.isBOGO);
    data.append("image", formData.image);
   data.append("message",formData.message)

    dispatch(createProduct(data));
  };


  useEffect(() => {
    if (status === "succeeded") {
      // Reset form data after successful product creation
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        isPopular: false,
        isOnSale: false,
        isBOGO: false,
        stock: "",
        image: null, 
        message: ""
      });
    }
  }, [status]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>

      {status === "loading" && <p>Loading...</p>}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <DynamicCheckboxGroup
            options={filterOptions}
            values={formData}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Product preview"
                className="w-full h-32 object-cover rounded"
              />
            </div>
          )}

          <div className="mb-4">
          <label className="block text-sm font-medium">Notification Message</label>
            <input type="text"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter a custom notification message"
            />

          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;




