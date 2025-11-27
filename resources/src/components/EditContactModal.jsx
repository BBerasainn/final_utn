import { useState, useEffect } from "react";
import axios from "axios";

export default function EditContactModal({
  isOpen,
  contact,
  onClose,
  onUpdated,
  onDeleted,
}) {
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  useEffect(() => {
    if (contact) {
      setEditName(contact.name);
      setCurrentAvatar(contact.avatar || null);
      setEditAvatar(null);
    }
  }, [contact]);

  if (!isOpen || !contact) return null;

  async function handleUpdate() {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/contacts/${contact._id}`,
        {
          name: editName,
          lastname: "",
          avatar: editAvatar || currentAvatar,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdated();
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  }


  async function handleDelete() {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/contacts/${contact._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onDeleted();
      onClose();
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  }



  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setEditAvatar(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white w-80 p-5 rounded shadow-xl">

        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Editar contacto
        </h3>

        <div className="flex justify-center mb-4">
          <label className="cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shadow flex items-center justify-center">
              <img
                src={editAvatar || currentAvatar}
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-between mt-2">
          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Eliminar
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancelar
            </button>

            <button
              onClick={handleUpdate}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
