import { currentUser, login } from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { message } from 'antd';
import React from 'react';
import { FormattedMessage, history, useIntl, useModel } from 'umi';

import { setAuthority } from '@/utils/authority';
import styles from './index.less';

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async (currentUser: API.CurrentUserAuth) => {
    setInitialState({
      ...initialState,
      currentUser,
    });
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const auth = await login({ ...values });
      setAuthority(auth.access_token);
      const loadingCurrentUser = await currentUser();
      await fetchUserInfo(loadingCurrentUser);
      goto();
      return;
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Nao foi possivel fazer login',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.formLogin}>
        <LoginForm
          // logo={<img alt="logo" src="/logo.svg" />}
          style={{ borderRadius: '5px' }}
          title="Bem-vindo!"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.login.username.required" />,
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '密码: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
