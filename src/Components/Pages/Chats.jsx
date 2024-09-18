import { useNavigate } from "react-router-dom";
// import { users } from "../../Constants/data";
import useOpenSearch from "../../Hooks/useOpenSearch";
import Layout from "../UI/Layout";
import Search from "../UI/Search";
import useAuth from "../../Hooks/useAuth";

const Chats = () => {
  const { openSearch } = useOpenSearch();
  const { users, loading } = useAuth();

  const navigate = useNavigate();
  const createChat = (userid, name) => {
    navigate(`/chat/${userid}`, {
      state: {
        name: name,
        recipientId:userid
      },
    });
  };
  return (
    <>
      <Layout title="Chats">
        {openSearch && <Search />}

        <h3 className="font-sora text-sub">
          All users:{" "}
          <span className="text-primary font-bold">{users.length}</span>
        </h3>

        <ul className="my-6 flex flex-col gap-2">
          {loading && <p>fetching chats...</p>}
          {users.map((user) => {
            const { $id, name, bio, userid } = user;
            return (
              <li key={$id}>
                <div
                  onClick={() => createChat(userid, name)}
                  className="flex items-center gap-4 bg-gradient-to-r from-light to-transparent hover:from-lighter hover:to-transparent p-2 rounded-md"
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
                    <p className="line-clamp-1 text-sub text-sm">{bio}</p>
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
