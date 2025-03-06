const TableSceleton = ({
  rows = 5,
  columns = 5,
}: {
  rows: number;
  columns: number;
}) => {
  return (
    <div className="overflow-x-auto md:w-[70vw] animate-pulse mt-10">
      <table className="border-collapse border border-gray-300 w-full">
        {/* Skeleton Table Head */}
        <thead className="bg-gray-200">
          <tr className="border-b">
            {[...Array(columns)].map((_, index) => (
              <th key={index} className="p-3 border">
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Skeleton Table Body */}
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="p-3 border">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSceleton;
