import React, { useEffect, useState, useMemo } from "react";
import { useOrders } from "../../context/Admin/OrderContext";
import {
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  "Out for Delivery": "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const DEFAULT_PAGE_SIZE = 10;

const Order = () => {
  const {
    orders = [],
    loading,
    pagination = {},
    fetchOrders,
    updateOrderStatus,
  } = useOrders();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(pagination.currentPage || 1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [showFilters, setShowFilters] = useState(false);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [processingOrderId, setProcessingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders({ status: selectedStatus, page, limit: pageSize, q: query });
  }, [selectedStatus, page, pageSize, query]);

  useEffect(() => {
    if (pagination.currentPage && pagination.currentPage !== page) {
      setPage(pagination.currentPage);
    }
  }, [pagination.currentPage]);

  const filteredOrders = useMemo(() => {
    if (!query) return orders;
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const idMatch = o._id?.toLowerCase().includes(q);
      const nameMatch = o.userId?.name?.toLowerCase().includes(q);
      const emailMatch = o.userId?.email?.toLowerCase().includes(q);
      return idMatch || nameMatch || emailMatch;
    });
  }, [orders, query]);

  const refresh = () => {
    fetchOrders({ status: selectedStatus, page, limit: pageSize, q: query });
  };

  const getNextStatuses = (currentStatus) => {
    const transitions = {
      Pending: ["Confirmed", "Cancelled"],
      Confirmed: ["Processing", "Cancelled"],
      Processing: ["Out for Delivery", "Cancelled"],
      "Out for Delivery": ["Delivered", "Cancelled"],
      Delivered: [],
      Cancelled: [],
    };
    return transitions[currentStatus] || [];
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const ok = window.confirm(
      `Mark order ${orderId.slice(-6)} as "${newStatus}" ?`
    );
    if (!ok) return;
    try {
      setProcessingOrderId(orderId);
      const success = await updateOrderStatus(orderId, newStatus);
      if (!success) {
        // handled in context toast
      }
    } finally {
      setProcessingOrderId(null);
      fetchOrders({ status: selectedStatus, page, limit: pageSize, q: query });
    }
  };


  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center bg-white border rounded-md px-2 py-1">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by id, name or email"
              className="outline-none text-sm px-2 py-1 w-56"
            />
            <button
              onClick={() => {
                setQuery("");
                setPage(1);
              }}
              className="text-sm text-gray-500 ml-2"
            >
              Clear
            </button>
          </div>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <FiFilter /> Filters
          </button>

          <button
            onClick={refresh}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </button>


        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status</span>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">All Statuses</option>
              {Object.keys(STATUS_COLORS).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Page size</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="px-3 py-2 border rounded-md"
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium">#{order._id.slice(-8)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <div className="font-medium">
                        {order.userId?.name || "—"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.userId?.email || order.email || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm max-w-xs">
                      {(order.items || []).slice(0, 3).map((it, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          {it.quantity}× {it.name}
                        </div>
                      ))}
                      {order.items && order.items.length > 3 && (
                        <div className="text-xs text-gray-400">
                          +{order.items.length - 3} more
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      ₹{order.totalAmount ?? order.total ?? 0}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[order.status] ||
                          "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-2">
                      <button
                        onClick={() => setDetailsOrder(order)}
                        className="px-3 py-1 bg-white border rounded-md text-sm hover:bg-gray-50"
                      >
                        Details
                      </button>
                      <select
                        disabled={
                          !getNextStatuses(order.status).length ||
                          processingOrderId === order._id
                        }
                        defaultValue=""
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          if (!newStatus) return;
                          handleStatusChange(order._id, newStatus);
                        }}
                        className="px-2 py-1 border rounded-md text-sm"
                      >
                        <option value="">Update</option>
                        {getNextStatuses(order.status).map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            <span className="text-sm text-gray-700">
              Page {page} of {pagination.totalPages || 1}
            </span>
            <button
              onClick={() =>
                setPage((p) =>
                  pagination.totalPages ? Math.min(p + 1, pagination.totalPages) : p + 1
                )
              }
              disabled={pagination.totalPages && page >= pagination.totalPages}
              className="p-2 rounded-md border bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Total Orders: {pagination.totalDocs ?? orders.length}
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {detailsOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setDetailsOrder(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Order #{detailsOrder._id.slice(-8)}
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Customer:</strong> {detailsOrder.userId?.name} (
                {detailsOrder.userId?.email})
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${STATUS_COLORS[detailsOrder.status]
                    }`}
                >
                  {detailsOrder.status}
                </span>
              </p>
              <p>
                <strong>Total:</strong> ₹
                {detailsOrder.totalAmount ?? detailsOrder.total}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {detailsOrder.phoneNumber || detailsOrder.userId?.phone || "—"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {detailsOrder.deliveryAddress
                  ? `${detailsOrder.deliveryAddress.street || ""}, ${detailsOrder.deliveryAddress.city || ""
                  }, ${detailsOrder.deliveryAddress.state || ""} - ${detailsOrder.deliveryAddress.pincode || ""
                  }`
                  : "—"}
              </p>

              <div>
                <strong>Items:</strong>
                <ul className="mt-1 list-disc list-inside text-gray-600">
                  {detailsOrder.items?.map((it, idx) => (
                    <li key={idx}>
                      {it.quantity}× {it.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
