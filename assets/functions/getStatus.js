export const getStatus = (projectStatus) => {
  const status =
    projectStatus.charAt(0).toUpperCase() +
    projectStatus.slice(1, projectStatus.length).toLowerCase();
  if (status === "Progress") {
    return { status, color: "text-yellow-500" };
  } else if (status === "Completed") {
    return { status, color: "text-green-500" };
  } else {
    return { status, color: "text-red-500" };
  }
};
