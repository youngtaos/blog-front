import { useEffect, useState } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';
import { SortableElement } from 'react-sortable-hoc';
import { useDispatch, useSelector } from 'react-redux';
import { getChangePageChild, getDeletePageChild } from '../../store/action';
import Banner from './Component/Banner/index';
import Article from './Component/Article/index';
import Footer from './Component/Footer/index';
import { cloneDeep } from 'lodash';
const { Option } = Select;





const AreaItem = (props) => {

  const { value: index } = props;
  const childPage = useSelector((state) => state.homeManagement?.schema?.children[index]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [temp, setTemp] = useState(cloneDeep(childPage));
  const dispatch = useDispatch();
  const map = { Banner, Article, Footer };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    dispatch(getChangePageChild(temp, index));
  };

  const removeItem = () => {
    dispatch(getDeletePageChild(index));
  }

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTemp(cloneDeep(childPage))
  };

  const handleSelectorChange = (value) => {
    const newSchema = { name: value, attributes: {}, children: [] };
    setTemp(newSchema);
  }

  const changeTempPageChildAttributes = (obj) => {
    const newTemp = cloneDeep(temp);
    for (let key in obj) {
      newTemp.attributes[key] = obj[key];
    }
    setTemp(newTemp);
  }

  const changeTempPageChildChildren = (children) => {
    const newTemp = cloneDeep(temp);
    newTemp.children = children;
    setTemp(newTemp);
  }

  const getComponent = () => {
    const { name } = temp;
    const Component = map[name];
    return (Component ?
      <Component {...temp} changeTempPageChildAttributes={changeTempPageChildAttributes} changeTempPageChildChildren={changeTempPageChildChildren}>
      </Component> : null)
  }

  useEffect(() => {
    setTemp(cloneDeep(childPage));
  }, [childPage]);

  return (
    <li className={styles.item}>
      <span
        className={styles.content}
        onClick={showModal}
      >{childPage?.name ? childPage?.name + ' 组件' : '当前区块内容为空'}</span>
      <span className={styles.delete}>
        <Button
          onClick={() => removeItem(index)}
          size="small" danger
        >删除</Button>
      </span>
      <Modal zIndex={0} bodyStyle={{ height: 500, overflowY: ' scroll' }} title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Select value={temp?.name} className={styles.selector} style={{ width: '100%' }} onChange={handleSelectorChange}>
          <Option value='Banner'>Banner 组件</Option>
          <Option value='Article'>Article 组件</Option>
          <Option value='Footer'>Footer 组件</Option>
        </Select>
        {
          getComponent()
        }
      </Modal>
    </li >
  )
}

export default SortableElement(AreaItem);
