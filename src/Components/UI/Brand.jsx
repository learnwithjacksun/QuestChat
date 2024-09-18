import logo from "../../assets/logo.svg";
const Brand = () => {
  return (
    <>
      <div className="flex items-center gap-1">
        <img src={logo} width={28} alt="Appwrite Logo" />
        <h3 className="font-sora text-[1.2em]">QuestChat</h3>
      </div>
    </>
  );
};

export default Brand;
