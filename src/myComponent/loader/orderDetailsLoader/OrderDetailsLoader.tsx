import CardSceleton from "./CardSceleton";

const OrderDetailsLoader = () => {
  return (
    <section className="px-4 md:px-32 md:p-8 mb-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl py-3 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CardSceleton></CardSceleton>
        <CardSceleton></CardSceleton>
        <CardSceleton></CardSceleton>
        <CardSceleton></CardSceleton>
      </div>
    </section>
  );
};

export default OrderDetailsLoader;
