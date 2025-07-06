import { Button, Spin } from 'antd';
import LocalStorageService from '../../../shared/utils/localStorageService/localStorageService.ts';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from '../../../app/store/store.ts';

const MainPage = observer(() => {
  const navigate = useNavigate();
  const { propertiesLoading } = store;

  const logout = () => {
    LocalStorageService.clearToken();
    navigate('/login', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Spin
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          zIndex: 1000,
        }}
        spinning={propertiesLoading}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button onClick={logout}>Выход</Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <h1>Добро пожаловать!</h1>
        </div>
      </Spin>
    </>
  );
});

export default MainPage;
