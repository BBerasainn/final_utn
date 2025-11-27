import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import EditContactModal from "../components/EditContactModal";
import { HiDotsVertical } from "react-icons/hi";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

export default function ChatView({ contact, onDeletedContact, onBack }) {
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const messagesEndRef = useRef(null); 
  const [editModal, setEditModal] = useState(false);
  const [editContact, setEditContact] = useState(null); 
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contacts/${contact._id}/messages`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setMessages(res.data || []);
      } catch (err) {
        console.error("Error cargando mensajes", err);
      }
    }

    if (contact?._id) loadMessages();
  }, [contact]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function openEdit() {
    setEditContact(contact);   
    setEditModal(true);
  }

  async function fetchContacts() {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/contacts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(res.data);
    } catch (err) {
      console.error("Error al cargar contactos:", err);
    }
  }

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 50);
    }
  }, [showSearch]);


  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#efeae2]">

      <div className="bg-[#202c33] text-white p-3 sm:p-4 flex items-center justify-between shadow">

        <div className="flex items-center gap-3">
          <button className="md:hidden text-white" onClick={onBack}>
            <FaArrowLeft size={20} />
          </button>

          <img
            src={contact.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={openEdit}
          />

          <p
            className="truncate max-w-[140px] sm:max-w-[200px] cursor-pointer"
            onClick={openEdit}
          >
            {contact.name} {contact.lastname}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaSearch
            size={18}
            className="cursor-pointer hover:text-[#00a884]"
            onClick={() => setShowSearch(!showSearch)}
          />
          <HiDotsVertical
            size={22}
            className="cursor-pointer hover:text-[#00a884]"
            onClick={openEdit}
          />
        </div>
      </div>

      {showSearch && (
        <input
          ref={searchRef}
          type="text"
          placeholder="Buscar mensajes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="m-3 px-4 py-3 rounded-full bg-white border shadow-sm outline-none w-[95%]"
        />
      )}

      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 pb-20">
        {messages
          .filter((m) =>
            m.text?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((msg) => (
            <MessageBubble key={msg._id || msg.id} message={msg} />
          ))}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSend={async (text) => {
          try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/contacts/${contact._id}/messages`,
              { text },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setMessages((prev) => [...prev, res.data]);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
          } catch (err) {
            console.error("Error enviando mensaje", err);
          }
        }}
      />

      
      <EditContactModal
        isOpen={editModal}
        contact={editContact}
        onClose={() => setEditModal(false)}
        onUpdated={fetchContacts}
        onDeleted={fetchContacts}
      />


    </div>
  );
}
