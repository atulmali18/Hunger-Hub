import React from "react";
import { useFood } from ".././context/FoodContext";

const List = () => {
    const { foods, loading, deleteFood } = useFood();

    if (loading) return <p className="text-center text-lg">Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Food List</h1>

            <table className="min-w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <tr key={food._id} className="text-center">
                            <td className="border px-4 py-2">
                                <img
                                    src={`http://localhost:4000/uploads/${food.image}`}
                                    alt={food.name}
                                    className="w-16 h-16 object-cover rounded-md mx-auto"
                                />
                            </td>
                            <td className="border px-4 py-2">{food.name}</td>
                            <td className="border px-4 py-2">{food.category}</td>
                            <td className="border px-4 py-2">₹{food.price}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteFood(food._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mr-2"
                                >
                                    Delete
                                </button>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
