import React, { useState } from "react";

const EditFood = ({ food, onClose, onUpdate }) => {
    const [data, setData] = useState({
        name: food.name,
        price: food.price,
        description: food.description,
        category: food.category,
    });
    const [image, setImage] = useState(null);

    const onChangeHandler = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        if (image) formData.append("image", image);

        onUpdate(food._id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="w-[90vw] max-w-3xl h-[90vh] bg-white rounded-2xl shadow-2xl relative animate-fadeIn overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800">Edit Food Item</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500 transition text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    <form onSubmit={onSubmitHandler} className="space-y-4">
                        {/* Upload Image */}
                        <div>
                            <p className="text-gray-700 font-medium mb-2">Food Image</p>
                            {image ? (
                                <div className="mb-4">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Uploaded"
                                        className="w-full h-64 object-cover rounded-md shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImage(null)}
                                        className="text-sm text-red-500 underline mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <img
                                        src={`http://localhost:4000/images/${food.image}`}
                                        alt={food.name}
                                        className="w-full h-64 object-cover rounded-md shadow-sm"
                                    />
                                </div>
                            )}

                            <label
                                htmlFor="image"
                                className="border-2 border-dotted border-gray-300 p-6 flex justify-center items-center cursor-pointer rounded-md hover:border-orange-400 transition"
                            >
                                <p className="text-gray-400 font-medium">
                                    Click to upload new image
                                </p>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={onChangeHandler}
                                placeholder="Enter item name"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={data.price}
                                onChange={onChangeHandler}
                                placeholder="Enter price"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={data.description}
                                onChange={onChangeHandler}
                                placeholder="Write short description..."
                                rows="4"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                            ></textarea>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                name="category"
                                value={data.category}
                                onChange={onChangeHandler}
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                            >
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

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 pt-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 font-medium shadow-md transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFood;
