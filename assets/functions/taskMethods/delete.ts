export async function deleteTask(taskId:string):Promise<void>  {
    if(window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
        try {
            const response = await fetch(`/api/tasks/delete?id=${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            window.location.reload()
            // Optionally, you can handle the response or update the UI
            console.log('Task deleted successfully');
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
}
export default deleteTask;