import React from "react";
import AntdProvider from "./AntdProvider";
import { ReduxProvider } from "./ReduxProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AntdProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </AntdProvider>
  );
}
