"use client";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function CountdownTimer({ date }: { date: Date }) {
  const t = useTranslations();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>();
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days: String(days).padStart(2, "0"),
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const renderDigits = (value: string, text: string) => (
    <div className="">
      <p className="text-xs font-medium">{text}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );

  if (timeLeft) {
    return (
      <div className="flex gap-x-4 items-center">
        {renderDigits(timeLeft.days, t("days"))}
        <div className="text-2xl text-main-hover">:</div>
        {renderDigits(timeLeft.hours, t("hours"))}
        <div className="text-2xl text-main-hover">:</div>
        {renderDigits(timeLeft.minutes, t("minutes"))}
        <div className="text-2xl text-main-hover">:</div>
        {renderDigits(timeLeft.seconds, t("seconds"))}
      </div>
    );
  }
}
