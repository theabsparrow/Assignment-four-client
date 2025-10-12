import { gender, status, userSortingOrder } from "@/const/user.const";
import {
  TGender,
  TStatus,
  TUSerRole,
} from "@/interface/userInterface/userInfo";
import CarListingSelect from "@/myComponent/selectComponent/CarListingSelect";
import {
  currentUserFlter,
  resetUserFilter,
  setUserSearchTerm,
  setUserSort,
} from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { RiEqualizerFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

const UserManagementFIltering = ({ total }: { total: number }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sorted, setSorted] = useState(true);
  const dispatch = useAppDispatch();
  const query = useAppSelector(currentUserFlter);

  const handelReset = () => {
    dispatch(resetUserFilter());
  };

  return (
    <>
      <section className="space-y-2 lg:px-2 sticky top-10 md:top-0 z-20 bg-[#f0f3f8] dark:bg-gray-700 py-2 md:py-4 ">
        <div className="flex items-center justify-between">
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <RiEqualizerFill />
          </button>
          <h1 className="text-2xl font-semibold ">Total {total} users</h1>
          <div className=" flex items-center gap-2">
            <button
              onClick={() => {
                setSorted(!sorted);
                const value = sorted ? "createdAt" : "-createdAt";
                dispatch(setUserSort(value));
              }}
              className={`flex flex-col items-center justify-center transition-all duration-200 
        ${query.sort === "createdAt" && "text-blue-700"}`}
              title={
                query.sort === "createdAt" ? "Oldest First" : "Newest First"
              }
            >
              {query.sort === "createdAt" ? (
                <span className="flex items-center">
                  <ArrowUp size={16} />
                  <ArrowDown size={16} />
                </span>
              ) : (
                <span className="flex items-center">
                  <ArrowDown size={16} />
                  <ArrowUp size={16} />
                </span>
              )}
            </button>
            <button
              onClick={handelReset}
              className="bg-red-500 text-white px-2 py-1 rounded shadow hover:bg-red-600 duration-500 "
            >
              Reset
            </button>
          </div>
        </div>

        {/* filter for large and medium device */}
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-4 md:flex-wrap lg:flex-nowrap">
            <input
              type="text"
              placeholder="Search items"
              className="p-2 border border-gray-300 rounded-lg bg-[#f0f3f8] dark:bg-gray-700 outline-none"
              value={query.searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                dispatch(setUserSearchTerm(value));
              }}
            />
            <CarListingSelect
              valueOptions={["admin", "user"] as TUSerRole[]}
              name="role"
              label="Role"
            />
            <CarListingSelect
              valueOptions={status as TStatus[]}
              name="status"
              label="Status"
            />
            <CarListingSelect
              valueOptions={gender as TGender[]}
              name="gender"
              label="Gender"
            />
            <CarListingSelect
              valueOptions={["Yes", "No"] as string[]}
              name="verifyWithEmail"
              label="Verified"
            />
            <div>
              <select
                value={query?.sort}
                onChange={(e) => {
                  const value = e.target.value as string;
                  dispatch(setUserSort(value));
                }}
                className="rounded-lg outline-none font-medium bg-transparent border-2 p-2"
              >
                <option value="">Sort by</option>
                {userSortingOrder.map((sortingOrder) => (
                  <option
                    key={sortingOrder.value as string}
                    value={sortingOrder.value as string}
                    className="dark:bg-gray-700"
                  >
                    {sortingOrder.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <section className="md:hidden font-inter">
          <Sheet open={open} onOpenChange={setOpen}>
            <DialogContent>mobile sidebar</DialogContent>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <GiHamburgerMenu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="py-6 ">
              <div className="space-y-4 h-full border w-full">
                <input
                  type="text"
                  placeholder="Search items"
                  className="p-2 border border-gray-300 rounded-lg bg-[#f0f3f8] dark:bg-gray-700 outline-none"
                  value={query.searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(setUserSearchTerm(value));
                  }}
                />
                <CarListingSelect
                  valueOptions={["admin", "user"] as TUSerRole[]}
                  name="role"
                  label="Role"
                />
                <CarListingSelect
                  valueOptions={status as TStatus[]}
                  name="status"
                  label="Status"
                />
                <CarListingSelect
                  valueOptions={gender as TGender[]}
                  name="gender"
                  label="Gender"
                />
                <CarListingSelect
                  valueOptions={["Yes", "No"] as string[]}
                  name="verifyWithEmail"
                  label="Verified"
                />
                <div>
                  <select
                    value={query?.sort}
                    onChange={(e) => {
                      const value = e.target.value as string;
                      dispatch(setUserSort(value));
                    }}
                    className="rounded-lg outline-none font-medium bg-transparent border-2 p-2"
                  >
                    <option value="">Sort by</option>
                    {userSortingOrder.map((sortingOrder) => (
                      <option
                        key={sortingOrder.value as string}
                        value={sortingOrder.value as string}
                        className="dark:bg-gray-700"
                      >
                        {sortingOrder.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </section>
      )}
    </>
  );
};

export default UserManagementFIltering;
