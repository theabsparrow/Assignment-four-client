import { TFeature } from "@/interface/carInterface/safetyFeature.interface";
import { TSafetyFeatureInfo } from "@/redux/features/car/carSlice.const";

const SafetyFeature = ({
  safetyFeature,
}: {
  safetyFeature: TSafetyFeatureInfo;
}) => {
  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Safety Feature
        </h2>
        {(safetyFeature?.features as TFeature[]).length > 0 && (
          <p className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-300 gap-1">
            {(safetyFeature?.features as TFeature[]).map((feature, i) => (
              <span key={i}>{feature},</span>
            ))}
          </p>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-2 text-gray-700 dark:text-gray-300 text-sm">
        <li className="flex items-center gap-1">
          <strong>Safety Rating:</strong> {safetyFeature?.safetyRating}
        </li>
        {safetyFeature?.airbags && (
          <li className="flex items-center gap-1">
            <strong>Air bags:</strong> {safetyFeature?.airbags} air bags
          </li>
        )}
        {safetyFeature?.warranty && (
          <li className="flex items-center gap-1">
            <strong>Warrenty:</strong> {safetyFeature?.warranty}
          </li>
        )}
      </ul>
    </div>
  );
};

export default SafetyFeature;
