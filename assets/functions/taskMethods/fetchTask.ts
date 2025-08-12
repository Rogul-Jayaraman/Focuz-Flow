interface Task {
  id: string;
  name: string;
  description: string;
  currentStatus: "ASSIGNED" | "PROGRESS" | "COMPLETED";
}

const fetchTask=async(projectId: string): Promise<Task[]> => {
    
  try {
    const res = await fetch(`/api/tasks?project=${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks`);
    }

    const data: { tasks: Task[] } = await res.json();
    return data.tasks || [];
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return [];
  }
}
export default fetchTask