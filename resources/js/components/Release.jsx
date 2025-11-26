import { useEffect } from "react";

export default function Release({ message, onClose }) {
    
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#111b21] text-white px-5 py-3 rounded-lg shadow-lg animate-fadeIn z-[99999]">
      {message}
    </div>
  );
}
