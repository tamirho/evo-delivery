export const useStopRun = ()=>{

    return (id:string)=> fetch(`api/v1/results/terminate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
      });
}