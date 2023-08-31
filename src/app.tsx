import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import { RequestOptionsInit, ResponseError } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import NoAutorizedAcessPage from '@/pages/404';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  return { //http://7de60790bfbd.sn.mynetname.net:8080/
    url: `http://7de60790bfbd.sn.mynetname.net:50800${url}`,
    options: {
      ...options,
      interceptors: true,
      headers: {
        ...options.headers,
      },
    },
  };
};

export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
  errorHandler: (error: ResponseError) => {
    const { response } = error;
    if (response && response.status) {
      const { status } = response;
      if (status !== 401) {
        response.json().then((data) => {
          notification.error({
            message: data.message,
          });
        });
      }
    }

    if (!response) {
      notification.error({
        description: 'OPS! não foi possivel realizar a operação',
        message: 'OPS!',
      });
    }
    throw error;
  },
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: isDev
      ? {
        content: 'DEV',
      }
      : null,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    inlineCollapsed: true,
    links: isDev
      ? [
        <Link to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <NoAutorizedAcessPage />,
    ...initialState?.settings,
  };
};
