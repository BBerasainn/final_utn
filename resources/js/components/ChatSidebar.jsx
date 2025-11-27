import { useState, useEffect } from "react";
import axios from "axios";
import EditContactModal from "../components/EditContactModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ChatSidebar({ onSelectContact }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newContact, setNewContact] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editContact, setEditContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

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
      console.error(err);
    }
  }

  async function handleCreateContact() {
    if (!newContact.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contacts`,
        {
          name: newContact.trim(),
          avatar: avatarPreview || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewContact("");
      setAvatarPreview(null);
      setShowModal(false);
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  }


  const handleLogout = () => {
    logout();         
    navigate("/");
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="
        bg-[#f0f2f5] border-r flex flex-col h-full
        w-full 
        max-w-full          
        overflow-hidden      
      "
    >

      <div className="
        p-4 bg-green-700/60 text-white flex justify-between items-center shadow
      ">
        <h2 className="text-lg font-bold">WhatsApp</h2>

        <button
          onClick={() => setShowModal(true)}
          className="
            bg-gray-800 hover:bg-green-600 text-white font-semibold
            px-3 py-1.5 rounded-full shadow-md transition
            text-xs sm:text-sm md:text-base
            whitespace-nowrap
          "
        >
          + Nuevo
        </button>

      </div>

      <div className="p-3 bg-white border-b">
        <input
          type="text"
          placeholder="Buscar contacto…"
          className="
            w-full border px-4 py-3 rounded-full bg-gray-100 outline-none
            text-gray-700 shadow-sm
            text-sm sm:text-base
          "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((c) => (
          <div
            key={c._id}
            onClick={() => onSelectContact(c)}
            className="
              px-4 py-4 flex items-center gap-4 cursor-pointer
              hover:bg-gray-200 border-b transition
            "
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setEditContact(c);
                setEditModal(true);
              }}
              className="
                w-12 h-12 flex items-center justify-center rounded-full
                bg-gray-400 text-white font-bold overflow-hidden cursor-pointer
              "
            >
              {c.avatar ? (
                <img
                  src={c.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                c.name.charAt(0).toUpperCase()
              )}
            </div>

            <div className="flex flex-col overflow-hidden">
              <p className="font-medium truncate text-[15px] sm:text-[16px]">
                {c.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                Haz clic para chatear
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white w-80 p-5 rounded shadow-xl">

            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Nuevo contacto
            </h3>

            <div className="flex justify-center mb-4">
              <label className="cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow">
                  {avatarPreview ? (
                    <img src={avatarPreview} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500">Foto</span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setAvatarPreview(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="Nombre del contacto"
              className="w-full border px-3 py-2 rounded mb-4"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreateContact}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      <EditContactModal
        isOpen={editModal}
        contact={editContact}
        onClose={() => setEditModal(false)}
        onUpdated={fetchContacts}
        onDeleted={fetchContacts}
      />

      <button
        onClick={handleLogout}
        className="
          m-4 px-4 py-2 rounded-lg bg-red-600 
          text-white font-semibold hover:bg-red-700
          transition shadow
        "
      >
        Cerrar sesión
      </button>

    </div>
  );
}
