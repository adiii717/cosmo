import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

type Bar = {
  key?: string;
  value: number;
  name: string;
  icon?: React.JSXElementConstructor<any>;
  href?: string;
  target?: string;
};

const getWidthsFromValues = (dataValues: number[]) => {
  let maxValue = -Infinity;
  dataValues.forEach((value) => {
    maxValue = Math.max(maxValue, value);
  });

  return dataValues.map((value) => {
    if (value === 0) return 0;
    return Math.max((value / maxValue) * 100, 1);
  });
};

export interface BarListProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar[];
  valueFormatter?: (value: number) => string;
  showAnimation?: boolean;
}

export const defaultValueFormatter = (value: number) => value.toString();

const BarList = React.forwardRef<HTMLDivElement, BarListProps>((props, ref) => {
  const {
    data = [],
    color,
    valueFormatter = defaultValueFormatter,
    showAnimation = true,
    className,
    ...other
  } = props;

  const widths = getWidthsFromValues(data.map((item) => item.value));

  const rowHeight = "h-9";

  if (data.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center italic text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("flex justify-between space-x-6", className)}
      {...other}
    >
      <div className={cn("relative w-full")}>
        {data.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key ?? item.name}
              className={cn(
                "flex items-center rounded-sm bg-primary/30",
                rowHeight,
                idx === data.length - 1 ? "mb-0" : "mb-2"
              )}
              style={{
                width: `${widths[idx]}%`,
                transition: showAnimation ? "all 1s" : "",
              }}
            >
              <div className={cn("absolute left-2 flex w-full text-sm")}>
                {Icon ? (
                  <Icon
                    className={cn("mr-2 h-5 w-5 text-secondary-foreground")}
                  />
                ) : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    target={item.target}
                    rel="noreferrer"
                    className={cn("w-full text-secondary-foreground")}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <p className={cn("text-secondary-foreground")}>{item.name}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"min-w-min text-right"}>
        {data.map((item, idx) => (
          <div
            key={item.key ?? item.name}
            className={cn(
              "flex items-center justify-end",
              rowHeight,
              idx === data.length - 1 ? "mb-0" : "mb-2"
            )}
          >
            <p className={cn("text-sm text-foreground")}>
              {valueFormatter(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

BarList.displayName = "BarList";

export default BarList;
