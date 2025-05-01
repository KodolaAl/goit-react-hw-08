import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contacts/selectors";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  return (
    <div>
      <ul className={css.list}>
        {contacts.map((contact) => {
          return (
            <li key={contact.id} className={css.contact}>
              <Contact contact={contact} />
            </li>
          );
        })}
      </ul>
      {error && (
        <h2>Whoops, something went wrong! Please try reloading this page!</h2>
      )}
      {loading && <h2>loading...</h2>}
    </div>
  );
};
export default ContactList;
