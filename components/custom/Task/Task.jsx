"use client";
import LoaderBar from "@/components/custom/Loaders/Loaders";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatus } from "@/assets/functions/getStatus";
import { Button } from "@/components/ui/button";
import { MessageCircleMore } from "lucide-react";

const TaskPage = () => {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);
  const [status, setStatus] = useState({ color: "", status: "" });

  useEffect(() => {
    if (!taskId) return;

    const fetchTaskDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/task?id=${taskId}`);
        if (!res.ok) throw new Error("Internal Server Error");

        const task = await res.json();
        setTaskDetail(task);
        if (task?.currentStatus) {
          setStatus(getStatus(task.currentStatus));
        }
      } catch (err) {
        console.log("Error fetching task:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (loading) return <LoaderBar />;

  if (!taskDetail) return null;

  return (
    <div className="p-4">
      <div className=" py-5 mb-3">
        <h1 className="text-orange-600/90 text-center text-3xl font-bold  ">
          {taskDetail.name} - Task Info
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Card className="bg-white/50 w-3xl">
        <CardHeader>
          <CardTitle className="text-cyan-900">{taskDetail.name}</CardTitle>
          <CardDescription>{taskDetail.description}</CardDescription>
          <CardAction className={`${status.color} text-xs`}>
            {status.status}
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <h1>
              Task belongs to <strong>{taskDetail.project.name}</strong> project
            </h1>
          </div>
        </CardContent>
        <CardFooter>
          <div>
            <Button className="flex item-center gap-2">
            <MessageCircleMore />
            <p>Add Comment</p>
          </Button>
          </div>
        </CardFooter>
      </Card>
      </div>
    </div>
  );
};

export default TaskPage;
