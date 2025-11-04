import React, { useState } from 'react'
import { useFood } from '../../context/Admin/FoodContext';

const Add = () => {
  const { addFood } = useFood();

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "Salad",
  });

  const onChangeHandler = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    addFood(formData); // ✅ call context function

    // reset form
    setData({ name: "", price: "", description: "", category: "Salad" });
    setImage(null);
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Upload Image */}
        <div className="mb-4">
          {image ? (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-full h-64 object-cover mb-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-red-500 underline text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-gray-700 mb-2 font-medium">Upload Image</p>
          )}

          <label
            htmlFor="image"
            className="border-2 border-dotted border-gray-300 p-6 flex justify-center items-center cursor-pointer mb-4 hover:border-orange-400 transition-colors"
          >
            <p className="text-gray-400">Click to upload image</p>
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Enter item name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            placeholder="Write short description..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={onChangeHandler}
            value={data.category}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors w-full"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
