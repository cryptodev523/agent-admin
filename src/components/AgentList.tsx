import { useState } from "react";
import { useAgents } from "../context/AgentContext";
import { AgentForm } from "./AddAgentForm";
import { Agent } from "../types";

export const AgentList = () => {
  const { agents, deleteAgent } = useAgents();
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [query, setQuery] = useState("");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const filteredAgents = agents.filter((agent) => {
    return (
      agent.name.toLowerCase().includes(query.toLowerCase()) ||
      agent.email.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Seen
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredAgents.map((agent) => (
              <tr key={agent.id}>
                <td className="px-6 py-4 whitespace-nowrap">{agent.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{agent.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      agent.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(agent.lastSeen)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingAgent(agent)}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAgent(agent.id)}
                    className="cursor-pointer text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        <div className="space-y-4">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{agent.name}</div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    agent.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {agent.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{agent.email}</div>
              <div className="text-sm text-gray-500">
                Last seen: {formatDate(agent.lastSeen)}
              </div>
              <div className="flex justify-end space-x-4 pt-2">
                <button
                  onClick={() => setEditingAgent(agent)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-gray-300 p-6 rounded-lg w-full max-w-md">
            <AgentForm
              agent={editingAgent}
              onClose={() => setEditingAgent(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
