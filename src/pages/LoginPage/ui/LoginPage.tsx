/* eslint-disable react-hooks/exhaustive-deps */
import { Box, AuthPageModule, IflexProvider } from '@iflex/iflex-ui';
import './LoginPage.less';
import store from '../../../app/store/store.ts';
import LocalStorageService from '../../../shared/utils/localStorageService/localStorageService.ts';
import { observer } from 'mobx-react-lite';
import AuthService from '../../../shared/auth-service/AuthService.ts';
import logoAuthorization from '../../../assets/svgFunctions/logoAuthorization.tsx';
import {
  blockedSpaceKeyDown,
  clearSpaceOnInput,
} from '../../../shared/utils/clearSpaceInput/clearSpaceInput.ts';
import { fetchTenantsByEmail } from '../model/services/fetchTenantsByEmail.ts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import type {
  TenantsAndPasswordFinishPromise,
  TenantsLoginData,
} from '../model/types/types.ts';

const LoginPage = observer(() => {
  const isAuthenticated = !!LocalStorageService.getAccessToken();
  const navigate = useNavigate();

  const { properties, propertiesLoading, themeUiMetaDataLoading } = store;
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const handleSubmit = ({
    id,
    username,
    password,
  }: TenantsLoginData): TenantsAndPasswordFinishPromise => {
    setAuthLoading(true);
    const lowerLogin = username;
    return new Promise((resolve, reject) => {
      AuthService.login(lowerLogin, password, id)
        .then((response) => {
          LocalStorageService.setToken(response.data);
          LocalStorageService.setObject('isAuth', true);
          resolve(response.data);
          window.location.reload();
        })
        .catch((e) => {
          if (e.response.status) {
            if (e.response.status === 400) {
              if (
                e.response?.data?.error_description ===
                  'The username or password is incorrect' ||
                e.response?.data?.error_description ===
                  'Неверный логин или пароль'
              ) {
                reject({
                  type: 'password',
                  message: 'Неверный логин или пароль',
                  redirectUsername: false,
                  validateStatus: 'error',
                  lockBtn: true,
                  redirectError: {
                    type: 'username',
                    message: 'Неверный логин или пароль',
                    validateStatus: 'warning',
                    lockBtn: true,
                  },
                });
              } else {
                reject({
                  type: 'email',
                  message:
                    'Ваш аккаунт заблокирован. Обратитесь к администратору',
                  redirectUsername: true,
                  validateStatus: 'warning',
                  lockBtn: true,
                  redirectError: {
                    type: 'username',
                    message:
                      'Ваш аккаунт заблокирован. Обратитесь к администратору',
                    validateStatus: 'warning',
                    lockBtn: true,
                  },
                });
              }
            } else {
              reject({
                type: 'password',
                message: e.response?.data?.error_description,
                redirectUsername: false,
              });
            }
          } else {
            reject({
              type: 'password',
              message: 'Ошибка авторизации',
              redirectUsername: false,
            });
          }
        })
        .finally(() => {
          setAuthLoading(false);
        });
    });
  };

  useEffect(() => {
    if (isAuthenticated && propertiesLoading) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, propertiesLoading]);

  return (
    <>
      {!themeUiMetaDataLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              position: 'absolute',
              left: '50%',
              bottom: '50%',
              transform: `translate(-50%, -50%)`,
              zIndex: 1000,
            }}>
            <Spin spinning={authLoading} />
          </div>

          <IflexProvider>
            <div
              className="flex-ui-form"
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                background: '#ffffff',
              }}>
              <Box
                sx={{
                  width: {
                    xs: 303,
                    md: 416,
                  },
                  marginTop: {
                    xs: '6vh',
                    md: '12.59vh',
                  },
                }}>
                <AuthPageModule
                  mode="tenant"
                  formsWrapSx={{
                    marginBottom: '126px',
                  }}
                  circleImgWithSubTxtProps={{
                    img: logoAuthorization(),
                    imgWrapSx: {
                      backgroundColor: 'transparent',
                      marginBottom: '9px',
                    },
                    sx: {
                      gap: 0,
                    },
                    txtSx: {
                      whiteSpace: 'nowrap',
                      fontSize: {
                        xs: '30px',
                        md: '38px',
                      },
                      marginBottom: '42px',
                      fontWeight: '600',
                      letterSpacing: '1.2px',
                    },
                  }}
                  privacyPolicyProps={{
                    style: {
                      textDecoration: 'underline',
                      fontWeight: 400,
                      fontSize: '12px',
                      color: '#1B1B1B',
                      marginBottom: '28px',
                    },
                    target: '_blank',
                  }}
                  tenantEmailFinish={fetchTenantsByEmail}
                  tenantsLogin={handleSubmit}
                  tenantEmailProps={{
                    defaultErrorMsg: 'Введите корректный email',
                    formProps: {
                      requiredMark: false,
                    },
                    btnProps: {
                      size: 'large',
                      shape: 'round',
                      style: {
                        fontSize: '16px',
                        marginTop: '32px',
                        borderRadius: '12px',
                      },
                    },
                    inputProps: {
                      onInput: (e) => clearSpaceOnInput(e),
                      onKeyDown: (e) => blockedSpaceKeyDown(e),
                      size: 'large',
                      style: {
                        borderRadius: '12px',
                        marginBottom: '4px',
                        padding: '8px 11px 6px',
                      },
                      placeholder: 'name@example.com',
                    },
                    fieldItemProps: {
                      style: {
                        whiteSpace: 'pre-line',
                        lineHeight: '1.5',
                        marginBottom: '24px',
                      },
                    },
                  }}
                  tenantsAndPasswordProps={{
                    defaultErrorMsg: 'Введите пароль',
                    forgotPasswordLink: '/password-forgotten',
                    formProps: {
                      requiredMark: false,
                    },
                    forgotPasswordLinkProps: {
                      style: {
                        color: '#00000073',
                      },
                    },
                    useForgotPassword: true,
                    inputProps: {
                      onInput: (e) => clearSpaceOnInput(e),
                      onKeyDown: (e) => blockedSpaceKeyDown(e),
                      size: 'large',
                      style: {
                        borderRadius: '12px',
                        marginBottom: '4px',
                        padding: '8px 11px 6px',
                      },
                    },

                    btnProps: {
                      size: 'large',
                      shape: 'round',
                      style: {
                        fontSize: '16px',
                        borderRadius: '12px',
                        marginTop: '32px',
                      },
                    },
                    selectProps: {
                      size: 'large',
                      style: {
                        fontSize: '16px',
                        borderRadius: '12px',
                      },
                    },
                    /*onFinish: handleAuthInTenant,*/
                  }}
                  privacyPolicy={true}
                  privacyPolicyLink={`${properties.privacy_policy}`}
                  markets={true}
                  marketsProps={{
                    markets: [
                      {
                        type: 'google',
                        link: `${properties.google_play_market}`,
                        linkProps: {
                          target: '_blank',
                        },
                      },
                      {
                        type: 'apple',
                        link: `${properties.app_store_market}`,
                        linkProps: {
                          target: '_blank',
                        },
                      },
                      {
                        type: 'ru',
                        link: `${properties.rustore_market}`,
                        linkProps: {
                          target: '_blank',
                        },
                      },
                    ],
                  }}
                  companyLogo={true}
                  customCompanyLogo={{
                    linkProps: {
                      type: 'iflex',
                      link: 'https://iflex.ru/',
                      linkProps: {
                        target: '_blank',
                      },
                    },
                    link: 'https://iflex.ru/',
                    marketIconProps: {
                      fill: '#8C8C8C',
                    },
                  }}
                />
              </Box>
            </div>
          </IflexProvider>
        </div>
      ) : (
        <div
          className="login-spin"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: '100%',
          }}>
          <Spin />
        </div>
      )}
    </>
  );
});

export default LoginPage;
