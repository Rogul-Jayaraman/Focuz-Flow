import { ChartNetwork, ClipboardPen, ScrollText } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Project Creation",
    description: "Easily initiate new projects to organize tasks and subtasks.",
    icon: ClipboardPen,
  },
  {
    title: "Subtask Management",
    description:
      "Add and manage subtasks within projects to break down complex tasks into manageable steps.",
    icon: ScrollText,
  },
  {
    title: "Status Tracking",
    description:
      "Monitor the current status of each subtask to keep track of progress.",
    icon: ChartNetwork,
  },
];


const Features = () => {
  return (
    <div>
      <h1 className="landpage-title">
        Key Features
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        {features.map((feature,ind) => (
          <Card key={ind} className="px-4 py-8">
            <CardHeader>
              <feature.icon className="w-14 h-14 mx-auto text-cyan-800 "/>
              <CardTitle >
                <h1 className="text-center text-base font-bold text-cyan-800">{feature.title}</h1>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mt-[-10] text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
