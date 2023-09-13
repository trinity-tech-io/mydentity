import { useEffect, useState } from "react";

export const useMounted = (): { mounted: boolean } => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted };
}