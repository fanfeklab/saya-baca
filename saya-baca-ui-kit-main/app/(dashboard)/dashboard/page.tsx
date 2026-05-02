"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", users: 186, active: 80 },
  { month: "Feb", users: 305, active: 200 },
  { month: "Mar", users: 237, active: 120 },
  { month: "Apr", users: 73, active: 190 },
  { month: "May", users: 209, active: 130 },
  { month: "Jun", users: 214, active: 140 },
]

const chartConfig = {
  users: {
    label: "Total Users",
    color: "hsl(var(--primary))",
  },
  active: {
    label: "Active Users",
    color: "hsl(var(--success))",
  },
}

export default function AdminDashboardContent() {
  return (
    <div className="space-y-6 flex flex-col w-full">
      <h1 className="text-3xl font-bold">Analytics Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 shadow-[4px_4px_0_0_#000000]">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">45,231</div>
            <p className="text-sm text-success font-bold mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-2 shadow-[4px_4px_0_0_#000000]">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12,042</div>
            <p className="text-sm text-success font-bold mt-1">+10.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-2 shadow-[4px_4px_0_0_#000000]">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Avg. Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">24m 15s</div>
            <p className="text-sm text-destructive font-bold mt-1">-2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-[4px_4px_0_0_#000000] p-6">
        <h2 className="text-xl font-bold mb-6">User Activity Growth</h2>
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="active" fill="var(--color-active)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
}
