import { useQuery } from "@tanstack/react-query";

export const useDrivers = () => {
  return useQuery(["drivers"], () =>
    fetch("api/v1/drivers/").then((res) => res.json())
  );
};
