import React from 'react';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, type ThemeConfig } from 'antd';
import { IflexProvider as IflexConfigProvider } from '@iflex/iflex-ui';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { breackpoints, theme } from '../theme/theme.tsx';
import { MainContainer } from './containers/MainContainer/ui/MainContainer.tsx';
import store from './store/store.ts';

const App: React.FC = observer(() => {
  const { themeUiMetaData } = store;

  const apiStyle: ThemeConfig = JSON.parse(JSON.stringify(themeUiMetaData));
  return (
    <>
      <BrowserRouter>
        <ConfigProvider theme={apiStyle ? apiStyle : theme}>
          <IflexConfigProvider
            configProviderProps={{ theme: apiStyle ? apiStyle : theme }}
            breakpoints={breackpoints}>
            <MainContainer />
          </IflexConfigProvider>
        </ConfigProvider>
      </BrowserRouter>
    </>
  );
});
export default App;
