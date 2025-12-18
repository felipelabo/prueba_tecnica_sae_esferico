import { ParcelaProvider } from "@/context/ParcelaContext";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function UserIdLayout({ children }: LayoutProps) {
  return (
    <ParcelaProvider>
      {children}
    </ParcelaProvider>
  );
}