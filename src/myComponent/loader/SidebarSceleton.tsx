const SidebarSceleton = () => {
  return (
    <div className="dark:bg-gray-900 bg-white dark:text-gray-200 transition-all duration-500 w-64 shadow-lg min-h-screen sticky top-0 z-50 animate-pulse">
      {/* Logo Placeholder */}
      <div className="cursor-pointer flex justify-center mt-6">
        <div className="w-36 lg:w-48 h-10 bg-gray-300 rounded"></div>
      </div>

      {/* Profile Image Placeholder */}
      <div className="flex justify-center mt-6">
        <div className="w-52 h-52 rounded-full bg-gray-300"></div>
      </div>

      {/* Navigation Placeholder */}
      <nav className="mt-6 space-y-4 px-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-10 bg-gray-300 rounded"></div>
        ))}
      </nav>

      {/* Logout Placeholder */}
      <div className="flex items-center justify-between px-8 gap-1 font-inter font-semibold hover:bg-[#f0f3f8] duration-500 p-3 dark:hover:bg-gray-800 border-y cursor-pointer mt-6">
        <div className="h-6 w-20 bg-gray-300 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default SidebarSceleton;
