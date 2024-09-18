import PropTypes from "prop-types";
import Heading from "./Heading"
const Layout = ({ children, title }) => {
   
    return (
      <>
          <div className="main">
              <Heading>{title}</Heading>
              <div className="layout">{ children}</div>
          </div>
      </>
  )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired
  };

export default Layout