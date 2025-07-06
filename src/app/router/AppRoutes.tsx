import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage/ui/LoginPage.tsx';
import MainPage from '../../pages/MainPage/ui/MainPage.tsx';
/*import NotFound from '../../pages/NotFound/NotFound.tsx';*/
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { Navigate } from 'react-router';
import PasswordForgotten from '../../pages/PasswordForgotten/ui/PasswordForgotten.tsx';
import PasswordRecovery from '../../pages/PasswordRecovery/ui/PasswordRecovery.tsx';
import MessageBlockSuccess from '../../pages/MessageBlockSuccess/MessageBlockSuccess.tsx';
import MessageBlockError from '../../pages/MessageBlockError/MessageBlockError.tsx';
import MessageBlockExpired from '../../pages/MessageBlockExpired/MessageBlockExpired.tsx';

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/password-forgotten" element={<PasswordForgotten />} />
        <Route path="/change_password" element={<PasswordRecovery />} />
        <Route path="/message-success" element={<MessageBlockSuccess />} />
        <Route path="/message-error" element={<MessageBlockError />} />
        <Route path="/message-expired" element={<MessageBlockExpired />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* <Route path="*" element={<NotFound />} />*/}
    </>
  );
};

export default AppRoutes;
