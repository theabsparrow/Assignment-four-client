import { TCarEngine } from "@/interface/carInterface/carEngine.interface";

const EngineInfo = ({ carEngine }: { carEngine: TCarEngine }) => {
  return (
    <div className="w-full p-4 space-y-2">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Engine Information
        </h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm">
        <li>
          <strong>Engine Type:</strong> {carEngine?.engine}
        </li>
        <li>
          <strong>Transmission:</strong> {carEngine?.transmission}
        </li>
        <li>
          <strong>Fuel:</strong> {carEngine?.fuelType}
        </li>

        <li>
          <strong>Mileage:</strong> {carEngine?.mileage} km
        </li>
        <li>
          <strong>Drive Train:</strong> {carEngine?.driveTrain}
        </li>
        <li>
          <strong>Top Speed:</strong> {carEngine?.topSpeed} km/h
        </li>
        <li>
          <strong>Horse Power:</strong> {carEngine?.horsePower} hp
        </li>
        <li>
          <strong>Torque:</strong> {carEngine?.torque} N-m
        </li>
        <li>
          <strong>Acceleration:</strong> {carEngine?.acceleration} sec
        </li>
      </ul>
    </div>
  );
};

export default EngineInfo;
