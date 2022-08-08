import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#666CFF',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'BIG Loterias',
  pwa: true,
  logo: 'https://firebasestorage.googleapis.com/v0/b/loterias-59675.appspot.com/o/logo-removebg-preview%201.png?alt=media&token=56ab59f6-0685-44ce-b6b1-419eb77ee8fa',
  iconfontUrl: '',
};

export default Settings;
