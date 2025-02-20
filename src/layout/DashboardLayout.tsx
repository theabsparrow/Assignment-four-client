import Sidebar from "@/myComponent/dashboard/sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="md:flex md:px-16 bg-[#f0f3f8] dark:bg-gray-800">
        <Sidebar></Sidebar>
        <div>this is outlet content</div>
      </div>
    </>
  );
};

export default DashboardLayout;
