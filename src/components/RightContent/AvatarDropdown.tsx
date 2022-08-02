import ModalPassword from '@/pages/user/components/ModalPassword';
import { removeAuthority } from '@/utils/authority';
import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { stringify } from 'querystring';
import React, { useCallback, useState } from 'react';
import { history, useModel } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    removeAuthority();
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [createModalVisible, setModalVisible] = useState<boolean>(false);

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'logout' && initialState) {
        removeAuthority();
        setInitialState({ ...initialState, currentUser: undefined });
        loginOut();
        return;
      }
    },
    [setInitialState],
  );
  const passwordModal = useCallback(
    (event: {
      key: React.Key;
      keyPath: React.Key[];
      item: React.ReactInstance;
      domEvent: React.MouseEvent<HTMLElement>;
    }) => {
      const { key } = event;
      if (key === 'password' && initialState) {
        setModalVisible(true);
        return;
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      <Menu.Item key="password" onClick={passwordModal}>
        <LogoutOutlined />
        Alterar senha
      </Menu.Item>
      <Menu.Item key="logout" onClick={onMenuClick}>
        <LogoutOutlined />
        Sair
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {currentUser.avatar && (
            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          )}
          {!currentUser.avatar && (
            <Avatar
              style={{ backgroundColor: '#f56a00', verticalAlign: 'middle', marginRight: 8 }}
              size="small"
            >
              {currentUser.name.slice(0, 1).toUpperCase()}
            </Avatar>
          )}
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
      <ModalPassword
        createModalVisible={createModalVisible}
        handleAdd={() => false}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default AvatarDropdown;
