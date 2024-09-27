import { useNavigate } from "react-router-dom";
import Layout from "../UI/Layout";
import Search from "../UI/Search";
import useAuth from "../../Hooks/useAuth";
import { useState, useEffect } from "react";

const Chats = () => {
  const { users, loading } = useAuth();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const createChat = (userid, name) => {
    navigate(`/chat/${userid}`, {
      state: {
        name: name,
        recipientId: userid,
      },
    });
  };

  useEffect(() => {
    const searchResults = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(searchResults);
  }, [search, users]);

  return (
    <>
      <Layout title="Chats">
        <Search search={search} setSearch={setSearch} />

        <h3 className="font-sora text-sub mt-4">
          All users:{" "}
          <span className="text-primary font-bold">{users.length}</span>
        </h3>

        <ul className="my-4 flex flex-col gap-2">
          {loading && <p>fetching chats...</p>}
          {filteredUsers.map((user) => {
            const { $id, name, userid } = user;
            return (
              <li data-aos="fade-right" data-aos-delay="200" key={$id}>
                <div
                  onClick={() => createChat(userid, name)}
                  className="flex items-center gap-4 bg-gradient-to-r from-lighter to-transparent p-2 rounded-md"
                >
                  <div className="min-h-10 max-w-10 bg-primary rounded-full overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.name}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="">{name}</h3>
                    {/* <p className="line-clamp-1 text-sub text-sm">
                        {bio}
                    </p> */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Layout>
    </>
  );
};

export default Chats;
