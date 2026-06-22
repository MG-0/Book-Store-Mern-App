import React from "react";
import useAllCategories from "./useAllCategories";
import { Folder } from "lucide-react";
import { Card } from "../../ui/Card";

export default function AllCategories() {
  const { categoryList, loading } = useAllCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // CLEAN CODE RATIONALE:
  // Keeping table structure styling inline keeps the UI cells, rows, and headers self-contained.
  // Using atomic Card components wraps table content cleanly without duplicating shadow or border rules.
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">All Categories 🏷️</h1>
            <p className="text-gray-400 text-xs mt-1">Review list of classification genres currently in use</p>
          </div>
        </div>

        {categoryList.length > 0 ? (
          <Card className="border-gray-100 shadow-sm overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {categoryList.map((cat) => (
                    <tr key={cat._id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg inline-block">
                          <Folder className="w-4 h-4" />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-400">{cat._id}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{cat.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 font-bold text-base mb-1">No categories found</h3>
            <p className="text-gray-400 text-xs">Get started by creating your first bookstore category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

