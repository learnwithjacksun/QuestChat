import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { account, databases } from "../Lib/appwrite";
import { ID, Query } from "appwrite";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
      console.log(res);
      setUser(res);
      await addUserData(res?.$id, name, email);
      await getUserData(res?.$id);
      navigate("/chats");
    } catch (error) {
      console.log("Register User:", error);
      throw new Error(error.message);
    }
  };

  const addUserData = async (id, name, email) => {
    try {
      const res = await databases.createDocument("chatdb", "users", id, {
        name: name,
        email: email,
        userid: id,
      });
      console.log(res);
    } catch (error) {
      console.log("Add User Data", error);
      throw new Error(error.message);
    }
  };

  const getUserData = async (id) => {
    try {
      const res = await databases.getDocument("chatdb", "users", id);
      setData(res);
    } catch (error) {
      console.log("Get User Data:", error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const res = await databases.listDocuments("chatdb", "users", [
          Query.notEqual("userid", user?.$id),
        ]);
        setUsers(res?.documents);
      } catch (error) {
        console.log("Fetch All Users:".error);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [user?.$id]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await account.get();
          setUser(res);
          await getUserData(res.$id);
      } catch (error) {
        console.log("Check Auth:", error);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const res = await account.get();
        setUser(res);
        navigate("/chats")
    } catch (error) {
      console.log("Login User:", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
        await account.deleteSession("current");
        navigate("/login")
    } catch (error) {
      console.log("Logout:", error);
      throw new Error(error.message);
    }
  };

  const contextData = {
    data,
    user,
    users,
    register,
    login,
    logout,
    loading,
  };

  return (
    <>
      <AuthContext.Provider value={contextData}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
