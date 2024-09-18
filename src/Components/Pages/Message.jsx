import { useEffect, useRef, useState } from "react";
import Layout from "../UI/Layout";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import useMessages from "../../Hooks/useMessages";
import Icon from "../UI/Icon";
import useAuth from "../../Hooks/useAuth";

const Message = () => {
  const location = useLocation();
  const { name, recipientId } = location.state || {};
  const { messages, sendMessage, deleteMessage } = useMessages(recipientId);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      toast.error("Write a message first!");
      return;
    }
    sendMessage(message);
    setMessage("");
  };

  const handleDelete = (id) => {
    toast.promise(deleteMessage(id), {
      loading: "Deleting message...",
      success: "Message deleted successfully",
      error: "Failed to delete message",
    });
  };
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Layout title={name}>
      <div className="pb-10">
        {/* Display messages */}
        {messages.length === 0 && <p>No messages yet!</p>}

        <ul className="my-8 flex flex-col gap-4 md:gap-10">
          {messages.map((msg) => (
            <li
              data-aos="fade-up"
              key={msg.$id}
              className={
                msg.userid === recipientId
                  ? "other-message-box"
                  : "user-message-box"
              }
            >
              {msg.userid === user?.$id && (
                <div
                  onClick={() => handleDelete(msg.$id)}
                  className="h-9 w-9 rounded-full flex-center bg-lighter"
                >
                  <Icon styles="text-[1.2em]">delete</Icon>
                </div>
                  )}
                 

              <div className="max-w-[70%]">
                <div
                  className={
                    msg.userid === recipientId
                      ? "other-message-body text-display"
                      : "user-message-body text-display"
                  }
                >
                  <div>{msg.message}</div>
                </div>
                <div
                  className={
                    msg.userid === recipientId
                      ? "other-message-details"
                      : "user-message-details"
                  }
                >{`${msg.name} - ${new Date(
                  msg.$createdAt
                ).toLocaleString()}`}</div>
              </div>
            </li>
          ))}

          <div ref={chatEndRef}></div>
        </ul>

        {/* Message input form */}
        <div className="absolute bottom-0 left-0 bg-light w-full py-1 flex items-center">
          <div className="w-[90%] md:w-[700px] mx-auto flex items-center gap-2">
            <form className="flex gap-2 flex-1" onSubmit={handleSubmit}>
              <textarea
                name="message"
                id="message"
                placeholder="Write a message..."
                className="flex-1 px-4 text-sm font-medium pt-3 h-12 bg-secondary border border-line rounded-lg placeholder:text-sub"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="btn-primary px-3 rounded-lg">
                <span>Send</span>
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Message;
