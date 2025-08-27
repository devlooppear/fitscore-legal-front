"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";

interface LoaderWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function LoaderWrapper({
  children,
  delay = 300,
}: LoaderWrapperProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  if (!isReady) {
    return <Loader inAll size={80} />;
  }

  return <>{children}</>;
}
