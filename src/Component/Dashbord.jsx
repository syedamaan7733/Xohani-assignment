import  Card from "./Card";
import  Button  from "./Button";
import { Star, Play } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "10", views: 50000 },
  { name: "12", views: 60000 },
  { name: "14", views: 55000 },
  { name: "16", views: 70000 },
  { name: "17", views: 80234 },
  { name: "18", views: 65000 },
  { name: "20", views: 72000 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-3 text-center rounded-lg">
        New webinar releasing on 23 April 2025 - <a href="#" className="underline">Learn More</a>
      </div>

      {/* Webinar Info */}
      <Card className="p-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">The Psychology of High-Performing Teams</h2>
          <p className="text-gray-600 mt-2">Discover the science behind team dynamics, motivation, and productivity.</p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="ml-1">4.8</span>
            <span className="ml-4 text-green-500 font-semibold">Active</span>
          </div>
          <p className="mt-2 text-lg font-bold">Price: $99</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg flex flex-col items-center">
          <Play className="w-12 h-12 text-blue-500" />
          <p className="mt-2">Sharan Hegde</p>
        </div>
      </Card>

      {/* Analytics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold">Total Views</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <h4 className="text-gray-600">Total Attendees</h4>
          <p className="text-2xl font-bold">500k</p>
        </Card>
        <Card className="p-4 text-center">
          <h4 className="text-gray-600">Total Revenue</h4>
          <p className="text-2xl font-bold">$1,236</p>
        </Card>
      </div>

      <Button className="w-full bg-blue-500 text-white p-3 rounded-lg">Edit Webinar</Button>
    </div>
  );
}
