import { useQuery } from "@tanstack/react-query";


export const useGetLocation = () => {

 return (address: string = "") => {
   return fetch(`api/v1/locations/?address=${address}/`)
     .then((res) => res.json())
     .then((res) => res.data)
     .catch((error) => {
       console.error("Error:", error);
     });
 }; 
};
