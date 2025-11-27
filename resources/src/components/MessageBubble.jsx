export default function MessageBubble({ message }) {
  const isMe = message.from === "me";

  return (
    <div
      className={`
        flex w-full my-1 
        ${isMe ? "justify-end" : "justify-start"}
      `}
    >
      <div
        className={`
          px-3 py-2 
          rounded-lg shadow-sm 
          relative
          whitespace-pre-wrap break-words
          text-gray-800
          
          max-w-[90%]      /* mobile */
          sm:max-w-[85%]   /* tablet */
          lg:max-w-[75%]   /* desktop */

          ${isMe 
            ? "bg-[#dcf8c6] rounded-br-none"   
            : "bg-white rounded-bl-none border border-gray-200"
          }
        `}
      >

        <p className="text-sm sm:text-base leading-snug">
          {message.text}
        </p>

        <span
            className="
              text-[10px] sm:text-xs 
              text-gray-500 
              block text-right mt-1
            "
          >
            {message.time
              ? new Date(message.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              : ""}
          </span>
      </div>
    </div>
  );
}
