import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const NotFoundPage = () => {
  return (
    <div>
      <Link to={"/"}>
        <FaArrowLeft />
        <p>To Home</p>
      </Link>
    </div>
  );
};
export default NotFoundPage;
