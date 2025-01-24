import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Agent } from "../types";

interface IAgentContext {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "lastSeen">) => void;
  updateAgent: (agent: Agent) => void;
  deleteAgent: (id: string) => void;
}

const AgentContext = createContext<IAgentContext | undefined>(undefined);

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const [agents, setAgents] = useState<Agent[]>(() => {
    const savedAgents = localStorage.getItem("agents");
    return savedAgents ? JSON.parse(savedAgents) : [];
  });

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  const addAgent = (agent: Omit<Agent, "id" | "lastSeen">) => {
    setAgents([
      ...agents,
      { ...agent, id: uuid(), lastSeen: new Date().toISOString() },
    ]);
  };

  const updateAgent = (agent: Agent) => {
    setAgents(agents.map((a) => (a.id === agent.id ? agent : a)));
  };

  const deleteAgent = (id: string) => {
    setAgents(agents.filter((a) => a.id !== id));
  };

  return (
    <AgentContext.Provider
      value={{ agents, addAgent, updateAgent, deleteAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgents must be used within an AgentProvider");
  }
  return context;
};
