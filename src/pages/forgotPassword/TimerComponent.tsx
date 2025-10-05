import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TTimerhandler } from "./ForgotPassword";

type TTimerComponentprops = {
  duration?: number;
  storageKey?: string;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimerComponent = forwardRef<TTimerhandler, TTimerComponentprops>(
  (
    { duration = 2 * 60 * 1000, storageKey = "otpExpiry", setIsExpired },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [resetCounter, setResetCounter] = useState(0);

    useImperativeHandle(ref, () => ({
      reset: () => {
        const newExpiry = Date.now() + duration;
        localStorage.setItem(storageKey, newExpiry.toString());
        setResetCounter((prev) => prev + 1);
      },
    }));

    useEffect(() => {
      let expiryTime: number;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        expiryTime = parseInt(stored);
      } else {
        expiryTime = Date.now() + duration;
        localStorage.setItem(storageKey, expiryTime.toString());
      }
      const interval = setInterval(() => {
        const now = Date.now();
        const diff = expiryTime - now;
        if (diff <= 0) {
          setTimeLeft(0);
          setIsExpired(true);
          clearInterval(interval);
        } else {
          setTimeLeft(diff);
          setIsExpired(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }, [duration, storageKey, setIsExpired, resetCounter]);

    const formatTime = (ms: number) => {
      const totalSec = Math.floor(ms / 1000);
      const min = String(Math.floor(totalSec / 60)).padStart(2, "0");
      const sec = String(totalSec % 60).padStart(2, "0");
      return `${min}:${sec}`;
    };
    console.log(timeLeft);
    return (
      <div>
        <p className="text-center mt-3 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-lg border border-yellow-300 dark:border-yellow-700 shadow-sm text-sm sm:text-base">
          ⏳ You can resend the code after{" "}
          <span className="font-semibold text-red-600 dark:text-red-400">
            {formatTime(timeLeft)} sec
          </span>
        </p>
      </div>
    );
  }
);

export default TimerComponent;
