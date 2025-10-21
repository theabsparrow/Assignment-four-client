import { TRegistrationdata } from "@/interface/carInterface/registrationData.interface";

const RegistrationInfo = ({
  registrationData,
}: {
  registrationData: TRegistrationdata;
}) => {
  return (
    <div className="w-full p-4 space-y-4 ">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 text-center">
          Registration Information
        </h2>
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          Vehicle Identification Number: <span>{registrationData?.vin}</span>
        </h2>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-sm">
        <li>
          <strong>License:</strong>{" "}
          {registrationData?.licensePlate ?? "not provided"}
        </li>
        <li>
          <strong> Authority:</strong>{" "}
          {registrationData?.registrationAuthority ?? "not provided"}
        </li>

        <li>
          <strong> Country:</strong>{" "}
          {registrationData?.registrationCountry ?? "not provided"}
        </li>

        <li>
          <strong> Pre Owner:</strong>{" "}
          {registrationData?.previousOwner ?? "not provided"}
        </li>

        <li>
          <strong> Pre Address:</strong>{" "}
          {registrationData?.previousOwnerAddress ?? "not provided"}
        </li>

        <li>
          <strong> Year:</strong>{" "}
          {registrationData?.registrationYear ?? "not provided"}
        </li>

        <li>
          <strong> Tax Paid:</strong>{" "}
          {registrationData?.roadTaxPaid ? "Yes" : "No"}
        </li>
      </ul>
    </div>
  );
};

export default RegistrationInfo;
