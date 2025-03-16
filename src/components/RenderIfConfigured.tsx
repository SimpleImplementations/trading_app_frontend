import { ReactNode } from "react";
import { useBackendConfigUnsafe } from "../contexts/BackendConfigContext";

function RenderIfConfigured({ children }: { children: ReactNode }) {
  const backendConfig = useBackendConfigUnsafe();

  return <div>{backendConfig ? children : <p>App configs not initialized.</p>}</div>;
}

export default RenderIfConfigured;
