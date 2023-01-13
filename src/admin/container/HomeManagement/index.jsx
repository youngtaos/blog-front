import { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import AreaList from './component/AreaList';
import { parseJsonByString } from '../../../common/utils';
import styles from './style.module.scss';
import request from '../../../common/request';
import { useSelector, useDispatch } from 'react-redux';
import { getChangeSchemaAction } from './store/action';
import Login from './component/Login';
import { AuthenticationClient } from "authing-js-sdk";

const authClient = new AuthenticationClient({
  appId: '63858a0caa6255ed2a69abe7',
});

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
}

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => {
    return state.homeManagement.schema;
  });
  const changeSchema = (schema) => {
    const action = getChangeSchemaAction(schema);
    dispatch(action);
  }
  return { schema, changeSchema };
}

const HomeManagement = () => {
  useEffect(() => {
    request.get('http://127.0.0.1:7001/api/schema/getLatestOne', { headers: { token } }).then((res) => {
      const data = res?.data;
      if (data) {
        const schema = data?.schema;
        changeSchema(parseJsonByString(schema, {}));
      }
    })
  }, [])
  // useEffect(() => {
  //   request.post('http://127.0.0.1:7001/api/schema/save', { schema: JSON.stringify(schema) }).then(() => {
  //   })
  // }, []);

  let login = false;
  const { collapsed, toggleCollapsed } = useCollapsed();
  const { schema, changeSchema } = useStore();
  const { token, tokenExpiredAt } = window.localStorage;
  const currentTime = (new Date()).getTime();
  const expireTime = (new Date(tokenExpiredAt)).getTime();
  const photo = window.localStorage.photo;

  if (token && currentTime <= expireTime) {
    login = true;
  }
  if (!login) {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenExpiredAt');
    window.localStorage.removeItem('photo');
  }

  const handleHomePageRedirect = () => { window.location.href = "/" }
  const handleSaveBtnClick = () => {
    request.post('http://127.0.0.1:7001/api/schema/save', { schema: JSON.stringify(schema) }).then(() => {
    })
  }

  const handleResetBtnClick = () => {
    request.get('http://127.0.0.1:7001/api/schema/getLatestOne').then((res) => {
      const data = res?.data;
      if (data) {
        const schema = data?.schema;
        changeSchema(parseJsonByString(schema, {}));
      }
    })
  }

  const handleLogout = () => {
    authClient.logout();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('tokenExpiredAt');
    window.localStorage.removeItem('photo');
    window.location.reload();
  }

  return token ? (
    <Layout>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
          <Menu.Item key="admin-home">
            <span className="iconfont">&#xe64d;</span>首页内容管理
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
            <span className="iconfont">&#xe601;</span>返回用户页面
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {
            collapsed
              ? <span className='iconfont' onClick={toggleCollapsed}>&#xe62c;</span>
              : <span className='iconfont' onClick={toggleCollapsed}>&#xe629;</span>
          }
          <img onClick={handleLogout} className={styles.avatar} src={photo} alt='jpg'></img>
        </Header>
        <Content className={styles.content}>
          <AreaList children={schema.children || []} />
          <div className={styles.buttons}>
            <Button type="primary" onClick={handleSaveBtnClick}>保存区块配置</Button>
            <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>重置区块配置</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  ) : <div className={styles.login}><Login /></div>;
}

export default HomeManagement;