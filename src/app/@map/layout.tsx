"use client";

import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MapLayout({ children }: Props) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    naver.maps.onJSContentLoaded = () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
