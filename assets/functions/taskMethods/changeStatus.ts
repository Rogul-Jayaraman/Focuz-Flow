type status = "ASSIGNED"|"PROGRESS"|"COMPLETED";
const changeStatus = async(taskId:string,projectId:string,taskStatus:status):Promise<void> => {
    try{
        const res = await fetch(`/api/tasks/changeStatus?task=${taskId}&project=${projectId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"applicationn/json"
            },
            body:JSON.stringify({currentStatus:taskStatus})
        })
    }catch(err:any){
        console.log("Error while changing status")
    }
}
export default changeStatus