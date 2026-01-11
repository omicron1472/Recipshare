import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { day: "Mon", likes: 45, saves: 23, comments: 12 },
  { day: "Tue", likes: 52, saves: 28, comments: 18 },
  { day: "Wed", likes: 38, saves: 19, comments: 8 },
  { day: "Thu", likes: 67, saves: 34, comments: 24 },
  { day: "Fri", likes: 89, saves: 45, comments: 32 },
  { day: "Sat", likes: 124, saves: 67, comments: 45 },
  { day: "Sun", likes: 98, saves: 52, comments: 38 },
];

export function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 0, right: 20, top: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="saves" 
                stroke="hsl(var(--secondary-foreground))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--secondary-foreground))', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
