// export const trackingStepsWithState = steps.map((step, index) => {
//     const Icon = step.icon;
//     const isCompleted = index < currentIndex;
//     const isCurrent = index === currentIndex;

//     return {
//       ...step,
//       Icon,
//       isCompleted,
//       isCurrent,
//       showConnector: index !== steps.length - 1,
//       connectorClass: index < currentIndex ? "bg-blue-500" : "bg-gray-300",
//       iconClass: isCompleted
//         ? "bg-green-500"
//         : isCurrent
//         ? "bg-blue-600 animate-pulse"
//         : "bg-gray-300 opacity-70",
//       labelClass: isCompleted
//         ? "text-green-600"
//         : isCurrent
//         ? "text-blue-600"
//         : "text-gray-400",
//     };
//   });
