"use client"

import * as React from "react"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Label } from "recharts"
// Keep original PieSectorDataItem import if needed elsewhere, but not directly used in renderActiveShape fix
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

// Assuming these imports are correct for your project structure
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const desktopData = [
  { name: "january", value: 186, color: "hsl(220, 90%, 60%)" },
  { name: "february", value: 305, color: "hsl(200, 90%, 60%)" },
  { name: "march", value: 237, color: "hsl(40, 90%, 60%)" },
  // { name: "april", value: 173, color: "hsl(270, 90%, 60%)" },
  // { name: "may", value: 209, color: "hsl(120, 90%, 60%)" },
]

const monthConfig = {
  january: { label: "January", color: "hsl(220, 90%, 60%)" },
  february: { label: "February", color: "hsl(200, 90%, 60%)" },
  march: { label: "March", color: "hsl(40, 90%, 60%)" },
  // april: { label: "April", color: "hsl(270, 90%, 60%)" },
  // may: { label: "May", color: "hsl(120, 90%, 60%)" },
}

// === CORRECTED renderActiveShape Function ===
const renderActiveShape = (props: any) => { // Using props: any for simplicity here based on previous errors
  const {
    cx, cy, innerRadius, outerRadius = 0, startAngle, endAngle, fill,
  } = props;

  // Check if required properties are valid numbers
  const arePropsValid = typeof cx === 'number' &&
                        typeof cy === 'number' &&
                        typeof innerRadius === 'number' &&
                        typeof outerRadius === 'number' &&
                        typeof startAngle === 'number' &&
                        typeof endAngle === 'number';

  // If props are NOT valid, return an empty group element instead of null
  if (!arePropsValid) {
    return <g />; // <-- Fix: Return empty element, not null
  }

  // Props are valid, proceed with rendering
  const activeOuterRadius = outerRadius + 8;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={activeOuterRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};
// === End Correction ===


// === Custom Tooltip Component (Unchanged) ===
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (!data || typeof data.value !== 'number' || typeof data.color !== 'string' || typeof data.name !== 'string') {
        return null;
    }
    const displayLabel = monthConfig[data.name as keyof typeof monthConfig]?.label ?? data.name;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: data.color }} />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{displayLabel}</span>
            <span className="text-sm text-muted-foreground">{`${data.value.toLocaleString()} Visitors`}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};


// === Main Chart Component (Unchanged Logic) ===
export function InteractivePieChart() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeData = desktopData[activeIndex]

  // Original guard clause
  if (!activeData) { return null; }

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Desktop Visitors</CardTitle>
          <CardDescription>
             {monthConfig[activeData.name as keyof typeof monthConfig]?.label ?? activeData.name} - {activeData.value.toLocaleString()} Visitors
          </CardDescription>
        </div>
        <Select value={activeData.name} onValueChange={(value) => { const index = desktopData.findIndex(item => item.name === value); if (index !== -1) { setActiveIndex(index) } }}>
          <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"><SelectValue placeholder="Select month" /></SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {desktopData.map((item) => (<SelectItem key={item.name} value={item.name} className="rounded-lg"><div className="flex items-center gap-2 text-xs"><span className="h-3 w-3 rounded-sm" style={{ backgroundColor: monthConfig[item.name as keyof typeof monthConfig]?.color ?? item.color }} />{monthConfig[item.name as keyof typeof monthConfig]?.label ?? item.name}</div></SelectItem>))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex justify-center p-0 sm:p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={CustomTooltip} cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }} />
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape} // Pass the corrected function
                data={desktopData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={1}
                dataKey="value"
                nameKey="name"
              >
                {desktopData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={0.5}/>))}
                <Label
                  content={(props) => {
                    const viewBox = props.viewBox as { cx?: number; cy?: number };
                    // Guard clause for label content
                    if (!viewBox || typeof viewBox.cx !== 'number' || typeof viewBox.cy !== 'number' || !activeData) {
                       return null; // Label can safely return null
                    }
                    const { cx, cy } = viewBox;
                    const selectedMonthLabel = monthConfig[activeData.name as keyof typeof monthConfig]?.label ?? activeData.name;
                    return (
                      <g>
                        <text x={cx} y={cy} dy="-0.5em" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-foreground">{activeData.value.toLocaleString()}</text>
                        <text x={cx} y={cy} dy="1.2em" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-muted-foreground">{selectedMonthLabel}</text>
                      </g>
                    );
                  }}
                  position="center"
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}