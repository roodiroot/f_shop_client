"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Toaster } from "sonner";

const ToasterRootComponent = () => {
  const isDesctop = useMediaQuery("(min-width: 1024px)");
  return <Toaster position={isDesctop ? "bottom-right" : "top-center"} />;
};

export default ToasterRootComponent;
