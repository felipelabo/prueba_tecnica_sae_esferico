import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function UserIdLayout({ children }: LayoutProps) {
  return (
    <main className="p-4 h-svh relative overflow-hidden">
      <h1 className="mb-8 text-3xl font-bold text-primary-dark">
        Clientes
      </h1>
      {children}
      <div id="circle-bg" className="z-2 opacity-20 absolute bottom-0 right-0 text-xs text-muted bg-primary-dark w-[50svh] h-[50svh] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div id="circle-bg" className="z-1 opacity-20 absolute bottom-0 right-0 text-xs text-muted bg-primary w-svh h-svh rounded-full translate-x-1/2 translate-y-1/2"></div>
    </main>
  );
}