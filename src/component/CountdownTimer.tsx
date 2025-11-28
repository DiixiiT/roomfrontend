import { useEffect, useState } from "react";

interface CountdownTimerProps {
  createdDate: string;            
  durationMinutes?: number;       
  onExpire?: () => void;          
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  createdDate,
  durationMinutes = 35,
  onExpire
}) => {
  console.log("CountdownTimer - createdDate:", createdDate);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!createdDate) return;

    const created = Date.parse(createdDate);
    console.log("Duration (ms):", durationMinutes)
    const expiry = created + durationMinutes * 60 * 1000; 

    const updateTimer = () => {
      const now = Date.now();
      console.log("Now:", now);
      const diff = expiry - now;
      console.log("Time Left (ms):", diff);

      if (diff <= 0) {
        setTimeLeft(0);
        if (onExpire) onExpire();
        return;
      }

      setTimeLeft(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [createdDate, durationMinutes, onExpire]);

  // Convert milliseconds → HH:MM:SS
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <h2>
      Time left: <br>
      </br>{format(hours)}:{format(minutes)}:{format(seconds)}
    </h2>
  );
};

export default CountdownTimer;
