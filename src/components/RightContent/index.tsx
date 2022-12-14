import { Tag, Space } from 'antd';
import { QuestionCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { useRequest } from '@@/plugin-request/request';

export type SiderTheme = 'light' | 'dark';


const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}`;
  }

  return (
    <Space className={className}>
      <Avatar />
      </Space>
  );
};
export default GlobalHeaderRight;
