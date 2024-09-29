import React from "react";

export default function LayoutInfo({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-w-[375px] bg-white h-full">{children}</div>;
}
