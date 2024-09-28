/* eslint-disable react/button-has-type */
/* From Uiverse.io by vinodjangid07 */
import './AddButtonStyle.css';

interface Props {
  onClick: () => void;
}
export const AddButton: React.FC<Props> = ({ onClick }) => {
  // Get the items from the Redux store

  return (
    <button className="Btn" onClick={onClick}>
      <div className="sign"> + </div>

      <div className="text"> إضافه </div>
    </button>
  );
};
