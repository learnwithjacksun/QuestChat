import { Link } from "react-router-dom";
import Brand from "../UI/Brand";
import Icon from "../UI/Icon";
import Footer from "../UI/Footer";

const Home = () => {
  return (
    <>
      <div className="main flex flex-col items-center w-full min-h-screen justify-around">
        <div className="layout flex flex-col gap-10 w-full">
          <div className="flex flex-col items-center gap-1">
            <Brand />
            <p className="text-sub text-sm">Connects with less boring friends... 🙁</p>
          </div>

          <div className="flex w-[80%] mx-auto items-center gap-2 md:gap-4 flex-col md:flex-row">
            <Link to="/chats" className="btn-primary rounded-md min-h-10 flex-1 w-full">
              <span>Go to Chats</span>
              <Icon>arrow_forward</Icon>
            </Link>


            <Link to="/register" className="btn bg-light min-h-10 rounded-md w-full flex-1 border border-line">
              <span>New Account</span>
              <Icon>person_add</Icon>
            </Link>
                  </div>
                  

              </div>
              
              <Footer/>
      </div>
    </>
  );
};

export default Home;
