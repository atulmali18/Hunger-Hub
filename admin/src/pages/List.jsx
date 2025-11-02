import React, { useState } from "react";
import { useFood } from "../context/FoodContext";
import { Trash2, Edit3, PlusCircle } from "lucide-react";
import EditFood from "./EditFood.jsx";
import Add from "./Add.jsx"; // import Add component

const List = () => {
    const { foods, loading, deleteFood, updateFood } = useFood();
    const [editingFood, setEditingFood] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-gray-600 text-lg font-medium">Loading...</p>
            </div>
        );

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    🍱 Food Inventory
                </h1>

                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-md shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                >
                    <PlusCircle size={18} />
                    Add Food
                </button>
            </div>

            {/* Food Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white text-left">
                            <th className="px-6 py-3 text-sm font-semibold">Image</th>
                            <th className="px-6 py-3 text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-sm font-semibold">Category</th>
                            <th className="px-6 py-3 text-sm font-semibold">Price</th>
                            <th className="px-6 py-3 text-sm font-semibold text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {foods.length > 0 ? (
                            foods.map((food) => (
                                <tr
                                    key={food._id}
                                    className="border-b hover:bg-gray-50 transition duration-150"
                                >
                                    <td className="px-6 py-3">
                                        <img
                                            src={`http://localhost:4000/images/${food.image}`}
                                            alt={food.name}
                                            className="w-14 h-14 object-cover rounded-md shadow-sm border"
                                        />
                                    </td>
                                    <td className="px-6 py-3 font-medium text-gray-700">
                                        {food.name}
                                    </td>
                                    <td className="px-6 py-3 text-gray-600">{food.category}</td>
                                    <td className="px-6 py-3 text-gray-700 font-semibold">
                                        ₹{food.price}
                                    </td>
                                    <td className="px-6 py-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => deleteFood(food._id)}
                                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md shadow-sm transition duration-150"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => setEditingFood(food)}
                                            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md shadow-sm transition duration-150"
                                        >
                                            <Edit3 size={16} />
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-500 font-medium"
                                >
                                    No food items found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editingFood && (
                <EditFood
                    food={editingFood}
                    onClose={() => setEditingFood(null)}
                    onUpdate={(id, formData) => {
                        updateFood(id, formData);
                        setEditingFood(null);
                    }}
                />
            )}

            {/* Add Food Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="bg-white w-[90vw] max-w-2xl h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
                        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                            <h2 className="text-2xl font-semibold text-gray-800">Add New Food</h2>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="text-gray-500 hover:text-red-500 text-xl transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <Add />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
