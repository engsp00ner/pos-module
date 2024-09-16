import { useDispatch, useSelector } from 'react-redux';
import { ChevronsLeft, ChevronsRight } from 'react-feather';
import { toggleActive } from '../../features/SideBar/SideBarSlice';
import { RootState } from '../../Store';

export const SideBarToggleButton: React.FC = () => {
  const HandleOnClick = () => {
    dispatch(toggleActive());
  };
  const dispatch = useDispatch();
  const isActive = useSelector((state: RootState) => state.sidebar.isActive);

  return (
    <button
      type="button"
      className="waves-effect waves-light nav-link rounded d-none d-md-inline-block mx-10"
      onClick={HandleOnClick} // Directly call HandleOnClick
    >
      {isActive ? <ChevronsRight /> : <ChevronsLeft />}
    </button>
  );
};
