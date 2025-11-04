import React, { useState } from "react";

const CancelModal = ({ isOpen, onClose, onConfirm }) => {
    const [reason, setReason] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason.trim()) return;
        onConfirm(reason);
        setReason("");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-3">Cancel Order</h3>
                <textarea
                    placeholder="Enter reason for cancellation..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-md border hover:bg-gray-100"
                        onClick={() => { setReason(""); onClose(); }}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!reason.trim()}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelModal;
