export const useEaRunDraft = ()=>{

   return (id:string) => {

     return fetch(`api/v1/drafts/${id}/evaluate_update`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
     })
       .then((res) => res.json())
       .then((res) => res.data)
       .catch((error) => {
         console.error("Error:", error);
       });
   }; 
}