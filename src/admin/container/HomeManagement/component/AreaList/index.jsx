import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import AreaItem from '../AreaItem';
import styles from './style.module.scss';
import { getAddPagechildrenAction, getItemLocationChange } from '../../store/action';



const SortableList = SortableContainer(({ list }) => {
  return (
    <ul className={styles.list}>
      {
        list.map((item, index) => (
          <AreaItem
            key={index}
            index={index}
            value={index}
          />
        ))
      }
    </ul>
  );
});



const AreaList = () => {
  const dispatch = useDispatch();
  const children = useSelector((state) => state.homeManagement?.schema?.children);

  const addItemToChildren = () => {
    const action = getAddPagechildrenAction();
    dispatch(action);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(getItemLocationChange(oldIndex, newIndex));
  };

  return (
    <div>
      <SortableList list={children} onSortEnd={onSortEnd} distance={5} />
      <Button type="primary" ghost onClick={addItemToChildren}>新增页面区块</Button>
    </div>
  );
}

export default AreaList;