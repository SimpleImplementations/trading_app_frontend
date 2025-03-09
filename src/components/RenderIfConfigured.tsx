import { ReactNode } from "react";
import { useExecutionConfigUnsafe } from "../contexts/ExecutionConfigContext";

function RenderIfConfigured({ children }: { children: ReactNode }) {

  const executionConfig = useExecutionConfigUnsafe()

  return (
    <div>
      {executionConfig ? children : <p>App configs not initialized.</p>}
    </div>
  );
}

export default RenderIfConfigured;