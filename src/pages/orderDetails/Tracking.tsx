import { CheckCircle } from "lucide-react";
import {
  progressPercentage,
  steps,
  trackingstatusColors,
} from "./orderDetails.const";
import { TTrackingInfoProps, TTrackingStatus } from "./orderDetails.interface";

const Tracking = ({ tracking }: { tracking: TTrackingInfoProps }) => {
  const currentIndex = steps.findIndex(
    (step) => step.status === tracking?.trackingStatus
  );

  const progress =
    progressPercentage[tracking?.trackingStatus as TTrackingStatus];
  const trackingColor =
    trackingstatusColors[tracking?.trackingStatus as TTrackingStatus];

  const trackingStepsWithState = steps.map((step, index) => {
    const Icon = step.icon;
    const isCompleted = index < currentIndex;
    const isCurrent = index === currentIndex;
    return {
      ...step,
      Icon,
      isCompleted,
      isCurrent,
      showConnector: index !== steps.length - 1,
      connectorClass: index < currentIndex ? "bg-blue-500" : "bg-gray-300",
      iconClass:
        step.status === "Delivered" && isCurrent
          ? "bg-green-500"
          : isCompleted
          ? "bg-green-500"
          : isCurrent
          ? "bg-blue-600 animate-pulse"
          : "bg-gray-300 opacity-70",
      labelClass:
        step.status === "Delivered" && isCompleted
          ? "text-green-600"
          : isCompleted
          ? "text-green-600"
          : isCurrent
          ? "text-blue-600"
          : "text-gray-400",
    };
  });

  return (
    <>
      <section className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl font-inter">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
            📦 Order Tracking Summary
          </h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
            Stay updated with your order's journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Tracking ID:
            </span>
            <span className="text-sm sm:text-base text-blue-600 font-semibold">
              {tracking?.trackingID || "N/A"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              Status:
            </span>
            <span
              className={`text-sm sm:text-base px-3 py-1 rounded-full font-semibold ${trackingColor}`}
            >
              {tracking.trackingStatus} {progress}%
            </span>
          </div>
        </div>

        <div className="mt-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              trackingstatusColors[tracking.trackingStatus as TTrackingStatus]
            }`}
            style={{
              width: `${
                progressPercentage[
                  tracking?.trackingStatus as TTrackingStatus
                ] || 0
              }%`,
            }}
          ></div>
        </div>

        <div className="text-right text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
          Progress:{" "}
          {progressPercentage[tracking?.trackingStatus as TTrackingStatus] || 0}
          %
        </div>
      </section>

      <section className="font-inter">
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto p-6 overflow-x-auto">
          {trackingStepsWithState.map((step) => (
            <div
              key={step.status}
              className="relative flex-1 flex flex-col items-center min-w-[100px] group"
            >
              {/* Connector line */}
              {step.showConnector && (
                <div
                  className={`absolute top-6 left-1/2 h-2 w-full z-0 ${step.connectorClass}`}
                />
              )}

              {/* Icon bubble */}
              <div
                className={`z-10 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg mb-2 transition-all duration-300 ${step.iconClass}`}
              >
                {step.isCompleted ? (
                  <CheckCircle className="w-8 h-8" />
                ) : (
                  <step.Icon className="w-8 h-8" />
                )}
              </div>

              {/* Status text */}
              <p
                className={`text-sm text-center font-medium ${step.labelClass}`}
              >
                {step.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Tracking;
