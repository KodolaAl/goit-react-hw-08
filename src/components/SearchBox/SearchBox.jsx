import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };
  return (
    <div className={css.box}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        className={css.form}
        type="text"
        id="search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default SearchBox;
