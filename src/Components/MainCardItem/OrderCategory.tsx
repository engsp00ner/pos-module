import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../features/MainSlice/MainCardCategoryslice';
import { RootState } from '../../Store';

interface Props {
  Text: string;
  ImgUrl: string;
  CategorySelected: string;
}

const OrderCategory: React.FC<Props> = ({ Text, ImgUrl, CategorySelected }) => {
  const dispatch = useDispatch();

  // Access the current category from the Redux store
  const category = useSelector(
    (state: RootState) => state.mainCardCategory.category
  );

  const handleOnClickCategory = (newCategory: string) => {
    dispatch(
      setCategory({
        type: newCategory,
        CategoryImage: ImgUrl,
        displayName: Text,
      })
    );
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className={`btn ${
          category.type === CategorySelected ? 'btn-success' : 'btn-info'
        } icon-container`}
        onClick={() => handleOnClickCategory(CategorySelected)}
        id={`filter-${CategorySelected}`}
      >
        <img
          src={ImgUrl}
          alt={`${Text} Icon`}
          style={{
            width: '3em',
            height: '5em',
            marginRight: '5px',
            background: 'transparent',
          }}
        />
        {Text}
      </button>
    </div>
  );
};

export default OrderCategory;
