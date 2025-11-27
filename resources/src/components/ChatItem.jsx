export default function ChatItem({ chat, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="p-3 border-b border-gray-700 hover:bg-[#202c33] cursor-pointer"
    >
      <div className="font-medium">{chat.name}</div>
      <div className="text-sm text-gray-400 truncate">{chat.lastMessage}</div>
    </div>
  );
}
