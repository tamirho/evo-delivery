import { useQuery } from "@tanstack/react-query";

export const useDriver = (driverId: string) => {
  return useQuery(["drivers", driverId], () =>
    fetch(`api/v1/orders/${driverId}`).then((res) => res.json())
  );
};
