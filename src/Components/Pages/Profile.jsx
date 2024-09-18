import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Icon from "../UI/Icon";
import Layout from "../UI/Layout";
import Modal from "../UI/Modal";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { databases } from "../../Lib/appwrite";

const Profile = () => {
  const { data, user, getUserData} = useAuth();
  const [bio, setBio] = useState(data?.bio);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  const updateBio = async (e) => {
    e.preventDefault();
    toast.promise(
      databases.updateDocument("chatdb", "users", user.$id, {
        bio: bio,
      }),
      {
        loading: "Updating Bio...",
        success: () => {
            toggleModal();
            getUserData(user?.$id)
          return `Bio updated successfully!`;
        },
        error: "Failed to update bio.",
      }
    );
  };

  return (
    <>
      <Layout title="Profile">
        <div className="flex items-center md:gap-6 gap-4 md:flex-row flex-col text-center md:text-left">
          <div className="relative bg-light h-32 w-32 rounded-full">
            <div className="bg-light h-32 w-32 rounded-full overflow-hidden">
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name}`}
                alt="Avatar"
              />
            </div>
          </div>

          <div>
            <h1 className="font-sora text-[1em]">{data?.name}</h1>
            <p className="text-sub text-sm">{data?.email}</p>
          </div>
        </div>

        <div className="bg-light mt-6 rounded-md p-2">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-[1em] font-sora">Bio:</h3>

            <button
              onClick={toggleModal}
              className="btn bg-lighter h-8 px-6 border border-line rounded"
            >
              <i className="fa-regular fa-pen-to-square fa-beat"></i>
              <span>Edit</span>
            </button>
          </div>
          <p className="text-display text-sub text-sm bg-secondary p-4">
            {data?.bio}
          </p>
        </div>
      </Layout>

      <AnimatePresence>
        {modal && (
          <Modal title="Edit Bio" toggleModal={toggleModal}>
            <form onSubmit={updateBio} className="flex flex-col gap-4">
              <textarea
                name="bio"
                id="bio"
                placeholder="Edit Bio"
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border-line border placeholder:text-sub text-sm font-medium focus-within:border-sub px-4 pt-4 bg-secondary w-full rounded-lg"
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn-primary h-10 rounded-md px-6"
                >
                  <span>Save Changes</span>
                  <Icon>save</Icon>
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
