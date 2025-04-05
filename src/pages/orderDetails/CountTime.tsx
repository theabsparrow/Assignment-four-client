import { CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const CountTime = ({ estimatedTime }: { estimatedTime: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(estimatedTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Record<string, unknown>>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [estimatedTime]);

  if (!timeLeft) {
    return (
      <div className="text-center py-4">
        <div className="flex justify-center items-center gap-2 text-green-600 dark:text-green-400 text-lg font-semibold">
          <CheckCircle className="w-6 h-6" />
          <span>Delivered Successfully!</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
          Your package has reached its destination.
        </p>
      </div>
    );
  }
  return (
    <div className="text-center py-4">
      <div className="flex justify-center items-center gap-2 text-blue-700 dark:text-blue-400 text-lg font-semibold">
        <Clock className="w-6 h-6" />
        <span>Estimated Delivery In:</span>
      </div>
      <div className="mt-2 text-gray-800 dark:text-gray-200 text-xl font-bold tracking-wide">
        <span className="inline-block min-w-[2rem]">
          {String(timeLeft.days).padStart(2, "0")}d
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(timeLeft.hours).padStart(2, "0")}h
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(timeLeft.minutes).padStart(2, "0")}m
        </span>{" "}
        <span className="inline-block min-w-[2rem]">
          {String(timeLeft.seconds).padStart(2, "0")}s
        </span>
      </div>
    </div>
  );
};

export default CountTime;
