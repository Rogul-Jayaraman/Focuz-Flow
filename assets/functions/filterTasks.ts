interface task {
    id:string,
    name:string,
    description:string,
    currentStatus:"ASSIGNED"|"PROGRESS"|"COMPLETED",
    endTime:Date,
    startTime:Date
} 
type status="ASSIGNED"|"PROGRESS"|"COMPLETED"
const filterTasks = (task:task[],filter:status):task[] => {
    let filteredTasks:task[]=[];
    if(task&&task.length===0){
        return filteredTasks;
    }
    if(task){for(let i=0;i<task.length;i++){
        if(task[i].currentStatus===filter){
            filteredTasks.push(task[i]);
        }
    }}
    return filteredTasks;
}
export default filterTasks;