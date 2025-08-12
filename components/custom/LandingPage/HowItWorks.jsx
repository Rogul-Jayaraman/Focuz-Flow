import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LogIn,
  FolderPlus,
  ListChecks,
  Activity,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

const howitworks = [
  {
    title: "Sign In to Your Account",
    description:
      "Begin by signing in securely to access your personalized dashboard. All your projects and tasks are right where you need them.",
    icon: LogIn,
  },
  {
    title: "Create a Project",
    description:
      "Start a new project by entering a name, setting goals, and defining timelines. This serves as your central workspace for task management.",
    icon: FolderPlus,
  },
  {
    title: "Customize Your Project",
    description:
      "Personalize each project by setting task priorities, tags, due dates, and visual labels for better organization.",
    icon: SlidersHorizontal,
  },
  {
    title: "Break It Down with Subtasks",
    description:
      "Organize your workflow by adding subtasks under each project. Clearly define each step to ensure clarity and progress.",
    icon: ListChecks,
  },
  {
    title: "Track Progress in Real-Time",
    description:
      "Monitor each subtask’s status from “To Do” to “In Progress” to “Completed.” Visual cues make tracking simple and effective.",
    icon: Activity,
  },
  {
    title: "Stay Informed with Notifications",
    description:
      "Receive timely alerts about updates and deadlines, helping you stay on top of your work with ease.",
    icon: Bell,
  },
];

const HowItWorks = () => {
  return (
    <div>
      <h1 className="landpage-title">How It Works</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-12 ">
        {howitworks.map((work, ind) => (
          <Card key={ind} className="px-4 py-8">
            <CardHeader>
              <work.icon className="w-14 h-14 mx-auto text-cyan-800 " />
              <CardTitle>
                <h1 className="text-center text-base font-bold text-cyan-800">
                  {work.title}
                </h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mt-[-10] text-gray-600">
                {work.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
