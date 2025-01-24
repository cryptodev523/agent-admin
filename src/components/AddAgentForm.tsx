import { useState } from "react";
import { Agent } from "../types";
import { useAgents } from "../context/AgentContext";

interface FormProps {
  agent?: Agent;
  onClose: () => void;
}

export const AgentForm = ({ agent, onClose }: FormProps) => {
  const { addAgent, updateAgent } = useAgents();
  const [formData, setFormData] = useState<Agent>(
    agent || {
      id: "",
      name: "",
      email: "",
      status: "Active",
      lastSeen: "",
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (agent) {
      updateAgent(formData);
    } else {
      addAgent(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-row items-center">
        <label className="w-24 text-xl font-medium text-left">Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full text-xl p-1 rounded-md bg-white border border-gray-400 outline-none"
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-24 text-xl font-medium text-left">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full text-xl p-1 rounded-md bg-white border border-gray-400 outline-none"
        />
      </div>
      <div className="flex flex-row items-center">
        <label className="w-24 text-xl font-medium text-left">Status</label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as "Active" | "Inactive",
            })
          }
          className="w-full text-xl p-1 rounded-md bg-white border border-gray-400 outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {agent ? "Update" : "Add"} Agent
        </button>
      </div>
    </form>
  );
};
