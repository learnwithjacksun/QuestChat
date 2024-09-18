import { Link } from "react-router-dom";
import AuthLayout from "../UI/AuthLayout";
import Input from "../UI/Input";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import Icon from "../UI/Icon";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { login, user } = useAuth();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email) toast.error("E-mail is required!");
    else if (!form.password) toast.error("Password is required!");
    else if (form.password < 8)
      toast.error("Password must be at least 8 characters!");
    else {
      toast.promise(login(form.email, form.password), {
        loading: "Logging In...",
        success: "Login Successfull!",
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };


  useEffect(() => {
    if (user) {
      setModal((prev) => !prev);
    }
  }, [user]);

  return (
    <>
      <AuthLayout
        title="Welcome back! 🎉"
        subtitle="Sign into your account to continue."
      >
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-[480px] mx-auto flex flex-col gap-4 bg-light p-4 rounded-md"
        >
          <Input
            id="email"
            label="E-mail"
            type="email"
            placeholder="Enter your e-mail address"
            bg_color="bg-secondary"
            value={form.email}
            handleChange={handleChange}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="> 7 characters"
            bg_color="bg-secondary"
            value={form.password}
            handleChange={handleChange}
          />
          <Link className="underline text-sm text-sub font-medium">
            forgotten password?
          </Link>
          <button type="submit" className="btn-primary h-10 rounded">
            Login
          </button>
          <p className="text-center text-sm text-sub">
            Create new account?{" "}
            <Link to="/register" className="font-bold underline text-primary">
              Register
            </Link>
          </p>
        </form>
      </AuthLayout>

      {modal && (
        <Modal
          toggleModal={() => setModal((prev) => !prev)}
          title={`Hello Gift`}
        >
          <div>
            <p>It seems you&apos;re still logged-in... 🤷‍♂️</p>
            <Link to="/chats" className="btn-primary rounded-lg w-1/2 mt-4 h-9">
              <span>Go to Chats</span>
              <Icon>arrow_forward</Icon>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Login;
