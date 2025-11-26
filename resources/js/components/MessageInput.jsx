import { useState } from "react";
import { Send } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={submit}
      className="
        flex items-center gap-3 
        bg-[#f0f2f5] px-4 py-3 
        border-t border-gray-300
        sticky bottom-0 
        w-full 
        z-30
      "
    >
      <input
        className="
          flex-1 px-4 py-2 
          bg-white border border-gray-300 rounded-full
          shadow-sm text-gray-900 placeholder-gray-500
          focus:outline-none focus:ring-1 focus:ring-green-500 transition
          text-sm sm:text-base
        "
        placeholder="Escribe un mensaje…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="
          bg-green-500 hover:bg-green-600 
          text-white p-3 rounded-full 
          shadow-md transition active:scale-95
        "
      >
        <Send size={20} />
      </button>
    </form>
  );
}
