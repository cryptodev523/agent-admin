import { useState } from "react";
import "./App.css";
import { AgentProvider } from "./context/AgentContext";
import { AgentForm } from "./components/AddAgentForm";
import { AgentList } from "./components/AgentList";

function App() {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <AgentProvider>
      <div className="mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Agent Admin</h1>
          <button
            onClick={() => setFormVisible(true)}
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Agent
          </button>
        </div>

        <AgentList />

        {isFormVisible && (
          <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center px-4">
            <div className="bg-gray-300 p-6 rounded-lg w-full max-w-md">
              <AgentForm onClose={() => setFormVisible(false)} />
            </div>
          </div>
        )}
      </div>
    </AgentProvider>
  );
}

export default App;
