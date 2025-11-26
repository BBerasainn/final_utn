import ChatItem from "./ChatItem";

export default function ChatList({ onSelectChat }) {
  const chats = [
    { id: 1, name: "Juan Pérez", lastMessage: "Nos vemos mañana 👋" },
    { id: 2, name: "Grupo React", lastMessage: "Completamos el proyecto 💪" },
    { id: 3, name: "Laura", lastMessage: "Gracias por todo 😊" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} onSelect={() => onSelectChat(chat)} />
      ))}
    </div>
  );
}
