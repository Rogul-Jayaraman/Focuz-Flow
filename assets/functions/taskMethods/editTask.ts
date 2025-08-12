const editTask = async (taskId: string, data: any, field: string) => {;
  try {
    const res = await fetch(`/api/tasks/editTask?id=${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({field,data}),
    });
    if (!res.ok) {
      throw new Error("Failed to edit task description");
    }
    return;
  } catch (err: any) {
    console.log("Error while editing task description:", err.message);
  }
};
export default editTask;
