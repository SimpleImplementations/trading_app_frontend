import { ReactNode } from "react";
import { useExecutionConfig } from "../contexts/ExecutionConfigContext";

function RenderIfConfigured({ children }: { children: ReactNode }) {

  const executionConfig = useExecutionConfig()

  return (
    <div>
      {executionConfig ? children : <p>App configs not initialized.</p>}
    </div>
  );
}

export default RenderIfConfigured;