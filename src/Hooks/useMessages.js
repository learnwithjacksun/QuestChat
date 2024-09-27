import { useState, useEffect, useCallback } from "react";
import { Query, ID } from "appwrite";
import { databases } from "../Lib/appwrite";
import useAuth from "./useAuth";

const useMessages = (recipientId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data, user } = useAuth();

    const fetchMessages = useCallback(async () => {
        if (!recipientId || !user?.$id) return;

        setLoading(true);
        try {
            const res = await databases.listDocuments("chatdb", "messages", [
                Query.or([
                    Query.and([
                        Query.equal("userid", user?.$id),
                        Query.equal("messageId", recipientId),
                    ]),
                    Query.and([
                        Query.equal("userid", recipientId),
                        Query.equal("messageId", user?.$id),
                    ]),
                ]),
            ]);

            setMessages(res.documents);
            console.log("Messages fetched:", res);
        } catch (error) {
            console.log("Fetch Messages:", error);
        } finally {
            setLoading(false);
        }
    }, [recipientId, user?.$id]);

    const sendMessage = useCallback(async (message) => {
        try {
            const res = await databases.createDocument("chatdb", "messages", ID.unique(), {
                userid: user?.$id,
                message: message,
                name: data?.name,
                messageId: recipientId,
            });
            console.log("Message sent:", res);
            fetchMessages();


        } catch (error) {
            console.log("Send Message:", error);
            throw new Error(error.message);
        }
    }, [fetchMessages, recipientId, user?.$id, data?.name]);





    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, sendMessage]);

    const deleteMessage = async (id) => {
        try {
            await databases.deleteDocument(
                "chatdb",
                "messages",
                id
            )
            fetchMessages()
        } catch (error) {
            console.log("Delete Message:", error);
            throw new Error(error.message);
        }
    }




    return { messages, sendMessage, loading, deleteMessage };
};

export default useMessages;
