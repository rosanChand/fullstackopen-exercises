// import PropTypes from "prop-types";
import { useSelector } from "react-redux";
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  if (!notification) {
    return null;
  }

  return <div className="error">{notification}</div>;
};
// Notification.propTypes = {
//   message: PropTypes.string,
// };
export default Notification;
