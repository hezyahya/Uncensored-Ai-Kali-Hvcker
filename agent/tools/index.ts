// agent/tools/index.ts
export const tools = [
  {
    name: "screenshot",
    description: "Captures a screenshot of the current desktop environment.",
    parameters: {}
  },
  {
    name: "run_command",
    description: "Executes a shell command in the Kali Linux terminal.",
    parameters: {
      type: "object",
      properties: {
        command: { type: "string", description: "The command to run." }
      },
      required: ["command"]
    }
  },
  {
    name: "mouse_move",
    description: "Moves the mouse cursor to a specific coordinate.",
    parameters: {
      type: "object",
      properties: {
        x: { type: "number" },
        y: { type: "number" }
      },
      required: ["x", "y"]
    }
  },
  {
    name: "mouse_click",
    description: "Performs a mouse click.",
    parameters: {
      type: "object",
      properties: {
        button: { type: "string", enum: ["left", "right", "middle"] }
      }
    }
  },
  {
    name: "keyboard_type",
    description: "Types text on the keyboard.",
    parameters: {
      type: "object",
      properties: {
        text: { type: "string" }
      },
      required: ["text"]
    }
  }
];
