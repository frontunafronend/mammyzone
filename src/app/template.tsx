"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
  }, [pathname]);

  return (
    <div key={tick} className="route-transition-root">
      {children}
    </div>
  );
}
