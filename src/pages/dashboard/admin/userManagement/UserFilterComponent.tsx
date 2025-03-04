import {
  genders,
  iSDelete,
  roles,
  statuses,
  userSortingOrder,
} from "@/myComponent/formInput/formInput.const";

type TFilter = {
  gender: string;
  role: string;
  status: string;
  isDeleted: string;
};
interface FilterProps {
  searchText: string;
  setSearchText: (value: string) => void;
  filter: TFilter;
  handleFilterChange: (key: string, value: string) => void;
  sort: string;
  setSelectedSortingOrder: (value: string) => void;
  handelReset: () => void;
}
const UserFilterComponent: React.FC<FilterProps> = ({
  searchText,
  setSearchText,
  filter,
  handleFilterChange,
  sort,
  setSelectedSortingOrder,
  handelReset,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search name, email or phone"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded outline-none"
      />

      {/* Gender Filter */}
      <select
        value={filter.gender}
        onChange={(e) => handleFilterChange("gender", e.target.value)}
        className="border p-2 rounded outline-none"
      >
        <option value="">Filter by gender</option>
        {genders.map((gender) => (
          <option key={gender.label} value={gender.value as string}>
            {gender.label}
          </option>
        ))}
      </select>

      {/* Role Filter */}
      <select
        value={filter.role}
        onChange={(e) => handleFilterChange("role", e.target.value)}
        className="border p-2 rounded outline-none"
      >
        <option value="">Filter by role</option>
        {roles.map((role) => (
          <option key={role.label} value={role.value as string}>
            {role.label}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={filter.status}
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="border p-2 rounded outline-none"
      >
        <option value="">Filter by status</option>
        {statuses.map((status) => (
          <option key={status.label} value={status.value as string}>
            {status.label}
          </option>
        ))}
      </select>

      {/* Delete Filter */}
      <select
        value={filter.isDeleted}
        onChange={(e) => handleFilterChange("isDeleted", e.target.value)}
        className="border p-2 rounded outline-none"
      >
        <option value="">Filter by delete</option>
        {iSDelete.map((deleteInfo) => (
          <option key={deleteInfo.label} value={deleteInfo.value as string}>
            {deleteInfo.label}
          </option>
        ))}
      </select>

      {/* Sorting */}
      <select
        value={sort}
        onChange={(e) => setSelectedSortingOrder(e.target.value)}
        className="border p-2 rounded outline-none"
      >
        <option value="">Sort by</option>
        {userSortingOrder.map((sortingOrder) => (
          <option key={sortingOrder.label} value={sortingOrder.value as string}>
            {sortingOrder.label}
          </option>
        ))}
      </select>

      {/* Reset Button */}
      <div>
        <button
          onClick={handelReset}
          className="bg-secondary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-secondary text-white font-bold p-2 rounded-md duration-500 transition "
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UserFilterComponent;
