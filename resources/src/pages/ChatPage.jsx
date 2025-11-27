import { useState } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatView from "../components/ChatView";

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(message) {
    setToast(message);
  }

  function handleBack() {
    setSelectedContact(null);
  }

  return (
    <div className="flex h-screen overflow-x-hidden">

      <div
        className={`
          h-full border-r bg-white

          /* Mobile: sidebar solo si NO hay chat abierto */
          ${selectedContact ? "hidden" : "block"}

          /* Desktop: sidebar siempre visible */
          md:block

          /* Ancho según pantalla */
          w-full md:w-[35%] lg:w-[30%] xl:w-[25%]
        `}
      >
        <ChatSidebar
          onSelectContact={setSelectedContact}
          onContactDeleted={() => showToast("Contacto eliminado")}
        />
      </div>

      <div
        className={`
          flex-1 min-w-0 h-full bg-[#efeae2]

          /* Mobile: mostrar chat solo si hay uno seleccionado */
          ${selectedContact ? "block" : "hidden"}

          /* Desktop: siempre visible */
          md:block
        `}
      >
        {selectedContact ? (
          <ChatView
            contact={selectedContact}
            onBack={handleBack}
            onDeletedContact={() => {
              setSelectedContact(null);
              showToast("Contacto eliminado");
            }}
          />
        ) : (
          <div className="hidden md:flex h-full items-center justify-center text-gray-500">
            Selecciona un chat para comenzar
          </div>
        )}
      </div>
    </div>
  );
}
