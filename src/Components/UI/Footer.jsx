const Footer = () => {
  return (
    <>
      <div className="text-center">
        <p className="text-sub text-sm">
          <a href="https://github.com/learnwithjacksun/TWC" target="_blank">
            Gift Jacksun <i className="fa-brands fa-github"></i>
          </a>
          , &copy; {new Date().getFullYear()}
        </p>
        <p>
          Powered by{" "}
          <a href="https://appwrite.io" className="text-primary">
            appwrite
          </a>
        </p>
      </div>
    </>
  );
};

export default Footer;
