import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, PlusCircle, BookOpen, FolderOpen, X } from "lucide-react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Admin Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Add Book", path: "/admin/addBook", icon: PlusCircle },
    { name: "All Books", path: "/admin/allBooks", icon: BookOpen },
    { name: "Add Category", path: "/admin/addCategory", icon: PlusCircle },
    { name: "All Categories", path: "/admin/allCategories", icon: FolderOpen },
  ];

  // CLEAN CODE RATIONALE:
  // Having the Tailwind CSS utility classes inline makes the sidebar structure extremely explicit.
  // We can see the responsive breakpoints (e.g. md:translate-x-0) directly next to the dynamic
  // state classes (isOpen conditional state), making layout behaviors transparent.
  return (
    <div className="min-h-screen flex bg-gray-50/50 font-sans">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2.5 rounded-xl shadow-md hover:bg-gray-800 transition active:scale-95"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full md:h-screen w-64 bg-gray-900 text-gray-300 p-6 z-50 transform transition-transform duration-300 border-r border-gray-800 flex flex-col justify-between
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="space-y-8">
          {/* Header & Close Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Admin Console</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-400 hover:text-white p-1 hover:bg-gray-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/30" : "text-gray-400 hover:bg-gray-800/60 hover:text-white"}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="text-[10px] text-gray-600 font-mono tracking-wider pt-6 border-t border-gray-800">
          BookStore v1.0.0
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 pt-20 md:pt-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

