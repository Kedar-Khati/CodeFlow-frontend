import React from "react";
import { useDnD } from "../context/DnDContext";
import { useClassContext } from "../context/ClassContext";

export default ({ onDeleteNode, selectedNodeId }) => {
  const [_, setType] = useDnD();
  const { classes } = useClassContext(); // Access the classes from the context

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Function to generate JSON data
  const generateJsonData = () => {
    return classes.map((cls) => ({
      classname: cls.name,
      classId: cls.id,
      attributes: cls.attributes.map((attr) => [attr.name, attr.type]),
      apis: cls.apis,
    }));
  };

  // Function to send JSON data to Flask and download ZIP
  const generateBackend = async () => {
    const jsonData = generateJsonData();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Create a blob from the response
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a download link for the ZIP file
      const link = document.createElement("a");
      link.href = url;
      link.download = "backend.zip";
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate backend:", error);
    }
  };

  return (
    <aside>
      <div
        className="description"
        style={{
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
        style={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
        style={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
        style={{
          fontSize: "16px",
          fontWeight: "400",
        }}
      >
        Output Node
      </div>
      <button
        style={{
          padding: "15px",
          border: "1px solid #dc3545",
          borderRadius: "4px",
          backgroundColor: selectedNodeId ? "lightpink" : "#f8f9fa",
          color: selectedNodeId ? "black" : "#ccc",
          textAlign: "center",
          cursor: selectedNodeId ? "pointer" : "not-allowed",
          fontSize: "18px",
          fontWeight: "900",
          transition: "background-color 0.3s ease",
          width: "100%",
          marginTop: "10px",
        }}
        className="deleteBtn dndnode"
        onClick={onDeleteNode}
        disabled={!selectedNodeId}
      >
        Delete Node
      </button>

      {/* Generate Backend Button */}
      <button
        style={{
          padding: "15px",
          border: "1px solid #007bff",
          borderRadius: "4px",
          backgroundColor: "#007bff",
          color: "white",
          textAlign: "center",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "900",
          transition: "background-color 0.3s ease",
          width: "100%",
          marginTop: "10px",
        }}
        onClick={generateBackend}
      >
        Generate Backend
      </button>
    </aside>
  );
};
