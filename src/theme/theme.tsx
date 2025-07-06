import type { ThemeConfig } from 'antd';

export const breackpoints = {
  xs: 0,
  sm: 393,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const theme: ThemeConfig = {
  token: {
    colorBgLayout: '#FAFAFA',
    colorBgContainer: '#FFFFFF',
    colorPrimary: '#1677FF',
    colorText: '#000000D9',
    fontFamily: 'Rubik',
  },
  components: {
    Button: {
      defaultColor: '#00AAFF',
      defaultBorderColor: '#00AAFF',
    },
    Input: {
      fontFamily: 'Rubik',
    },
  },
};
