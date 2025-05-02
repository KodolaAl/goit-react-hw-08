import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";

import { deleteContact } from "../../redux/contacts/operations";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.box}>
      <div className={css.user}>
        <p className={css.text}>
          <FaUser /> {contact.name}
        </p>
        <p className={css.text}>
          <FaPhone /> {contact.number}
        </p>
      </div>
      <button className={css.button} type="button" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
