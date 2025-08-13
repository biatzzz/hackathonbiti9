import React from "react";

type UnitProps = { label: string; value: number };

const FlipUnit: React.FC<UnitProps> = ({ label, value }) => {
  const prevRef = React.useRef(value);
  const [old, setOld] = React.useState(value);
  const [flipping, setFlipping] = React.useState(false);

  React.useEffect(() => {
    if (value !== prevRef.current) {
      setOld(prevRef.current);
      setFlipping(true);
      const t = setTimeout(() => {
        prevRef.current = value;
        setFlipping(false);
      }, 650);
      return () => clearTimeout(t);
    }
  }, [value]);

  const cur = String(value).padStart(2, "0");
  const prev = String(old).padStart(2, "0");

  return (
    <div className="text-center">
      <div className="relative w-16 sm:w-20 h-16">
        <div className={`flip-card-surface flip-top ${flipping ? "is-animating" : ""}`}>
          <span className="text-2xl sm:text-3xl font-bold tabular-nums">{prev}</span>
        </div>
        <div className={`flip-card-surface flip-bottom ${flipping ? "is-animating" : ""}`}>
          <span className="text-2xl sm:text-3xl font-bold tabular-nums">{cur}</span>
        </div>
      </div>
      <div className="text-[11px] sm:text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

export const FlipClock: React.FC<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="mt-8 grid grid-cols-4 max-w-md text-center gap-2">
      <FlipUnit label="Dias" value={days} />
      <FlipUnit label="Horas" value={hours} />
      <FlipUnit label="Min" value={minutes} />
      <FlipUnit label="Seg" value={seconds} />
    </div>
  );
};
