import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import useAuth from "../../Hooks/useAuth";
import Modal from "./Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { navlinks } from "../../Constants/data";

const Heading = ({ children }) => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);
    const { data, logout } = useAuth();
    
    const handleLogout = () => {
        toast.promise(
            logout(),
            {
                loading: "Logging out...!",
                success: "Logout Successful!",
                error: "An error occurred!"
            }
        )
    }
  return (
    <>
      <div className="line mb-4">
        <div className="layout h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={-1}
              className="h-10 w-10 btn bg-light border border-line rounded-md"
            >
              <Icon>arrow_back</Icon>
            </Link>
            <h3 className="text-[1.2em] font-sora">{children}</h3>
          </div>
          <div className="flex items-center gap-4">
          

            <div
              onClick={toggleModal}
              className="bg-light cursor-pointer h-10 w-10 rounded-full overflow-hidden"
            >
              <img
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name}`}
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <Modal title="Menu" toggleModal={toggleModal}>
            <div className="flex flex-col gap-4">
              {navlinks.map((x, y) => (
                <Link key={y} to={x.path} className="flex items-center gap-2 border-b border-line py-2 hover:bg-lighter hover:px-4 duration-200 hover:rounded-md">
                  <Icon>{x.icon}</Icon>
                  <span>{x.name}</span>
              </Link>
              ))}

              <button onClick={handleLogout} className="btn-primary h-9 w-1/2 px-6 rounded-md">
                <Icon>logout</Icon>
                <span>Logout</span>
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
