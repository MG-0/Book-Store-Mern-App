import React from "react";
import useCategories from "./useCategories";
import { BookOpen, FolderOpen } from "lucide-react";

export default function Categories() {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  // CLEAN CODE COMMENT:
  // We keep styling classes inline. The dynamic background colors are defined as a local list
  // and assigned based on the category item index. This keeps layout logic clean and visual.
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Browse by Genre 📚
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            Find your favorite reading category. Choose from our widely populated genres.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, index) => {
            const colors = [
              "from-blue-50 to-indigo-50 border-blue-100 text-blue-700 hover:border-blue-300",
              "from-purple-50 to-pink-50 border-purple-100 text-purple-700 hover:border-purple-300",
              "from-green-50 to-emerald-50 border-green-100 text-green-700 hover:border-green-300",
              "from-amber-50 to-orange-50 border-amber-100 text-amber-700 hover:border-amber-300",
            ];
            const style = colors[index % colors.length];

            return (
              <div
                key={cat._id}
                className={`bg-gradient-to-br ${style} border rounded-2xl p-6 text-center cursor-pointer transform hover:-translate-y-1 hover:shadow-md transition duration-300 group`}
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition duration-300">
                  {index % 2 === 0 ? (
                    <BookOpen className="w-6 h-6" />
                  ) : (
                    <FolderOpen className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-bold text-gray-800 text-sm leading-snug truncate">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-wider">
                  Explore Genre
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
