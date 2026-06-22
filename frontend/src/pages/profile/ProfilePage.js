// CLEAN CODE RATIONALE:
// This page implements the user profile and order list display.
// We import reusable Card and Skeleton components, preserving standard design properties
// and keeping custom inline styling directly co-located with user data.
import React from "react";
import useProfilePage from "./useProfilePage";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import { User, Calendar, MapPin, Package } from "lucide-react";

export default function ProfilePage() {
  const { user, orders, loading } = useProfilePage();

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Shipped":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-150";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* User Card */}
        <Card className="bg-white p-6 md:p-8 border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
            <User className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left space-y-1.5 flex-1">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{user?.name}</h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
                <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full mt-2">
                  Account: {user?.role || "user"}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Orders Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600" />
            Order History
          </h2>

          {loading ? (
            // Skeleton Loader list for orders
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-white p-6 border-gray-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order._id} className="bg-white border-gray-100 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gray-50/50 px-6 py-4 border-b border-gray-50 flex flex-wrap justify-between items-center gap-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-gray-400">ID: {order._id}</span>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-full ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </CardHeader>
                  <CardContent className="px-6 py-4 divide-y divide-gray-50 space-y-4">
                    {/* Items List */}
                    <div className="space-y-3 pt-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            {item.book?.imageUrl && (
                              <img
                                src={`http://localhost:3000/images/${item.book.imageUrl}`}
                                alt={item.book.title}
                                className="w-10 h-12 object-cover rounded border"
                              />
                            )}
                            <div>
                              <span className="font-bold text-gray-800">{item.book?.title || "Book deleted"}</span>
                              <span className="text-xs text-gray-400 block">Quantity: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-mono text-gray-600 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Summary row */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-2 text-xs font-semibold text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        Shipped to: {order.shippingAddress.address}, {order.shippingAddress.city}
                      </span>
                      <div className="text-right w-full sm:w-auto">
                        <span className="text-xs text-gray-400 mr-2 font-normal">Total Paid:</span>
                        <span className="text-lg font-black text-indigo-600 font-mono">${order.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-gray-900 font-bold text-base mb-1">No orders placed yet</h3>
              <p className="text-gray-400 text-xs">Your bookstore purchase history will be displayed here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
