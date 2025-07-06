/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import './PasswordForgotten.less';
import { Spin } from 'antd';
import { Box, IflexProvider, PasswordRecoverFormModule } from '@iflex/iflex-ui';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logoPassword from '../../../assets/svgFunctions/logoPassword.tsx';
import {
  blockedSpaceKeyDown,
  clearSpaceOnInput,
} from '../../../shared/utils/clearSpaceInput/clearSpaceInput.ts';
import type {
  ITenant,
  ITenantError,
  IUsernameError,
  IUsernameSuccess,
} from '../model/types/types.ts';
import { clientUnAuthorized } from '../../../shared/auth-service/AuthServiceInt.ts';
import { forgottenPasswordApi } from '../../../shared/api/forgottenPassword/forgottenPasswordApi.ts';
import { getTenantsByEmail } from '../../../shared/api/tenants/tenantsApi.ts';

const PasswordForgotten = () => {
  const [loadingData, setLoadingData] = useState(false);
  /* const tenantId = LocalStorageService.getTenantId();*/
  const navigate = useNavigate();

  const handleUserNameFinish = (
    username: string,
    tenant?: ITenant | null,
  ): Promise<ITenantError | any> => {
    setLoadingData(true);
    return new Promise((resolve, reject) => {
      clientUnAuthorized
        .post(forgottenPasswordApi(username, tenant ? String(tenant?.id) : '1'))
        .then((response) => {
          if (response && response.status === 204) {
            navigate('/message-success');
            resolve({
              type: 'page',
              message:
                'Письмо с инструкцией\n по восстановлению пароля\n успешно выслано на адрес\n электронной почты',
            });
          }
        })
        .catch((e) => {
          if (e.response.status === 422) {
            reject({
              type: 'username',
              message: 'Пользователь с таким email не найден',
              validateStatus: 'error',
              lockBtn: true,
            });
          } else {
            navigate('/message-error');
            reject({
              type: 'username',
              //здесь отображать страницу с ошибкой
              message: 'Ошибка. Пожалуйста, повторите попытку позже',
              validateStatus: 'error',
              lockBtn: true,
            });
          }
        })
        .finally(() => {
          setLoadingData(false);
        });
    });
  };

  const fetchTenantsByEmailPasswordRestore = (
    email: string,
  ): Promise<IUsernameSuccess | IUsernameError> => {
    return new Promise((resolve, reject) => {
      clientUnAuthorized
        .get(getTenantsByEmail(email))
        .then(({ data }) => {
          if (data) {
            if (data?.length === 1) {
              handleUserNameFinish(email);
            } else if (data?.length > 1) {
              resolve(data);
            } else {
              reject({
                type: 'username',
                message: 'Пользователь с таким email не найден',
                validateStatus: 'error',
                lockBtn: true,
              });
            }
          } else {
            navigate('/message-error');
            reject({
              type: 'username',
              message: 'Пользователь с таким email не найден',
              validateStatus: 'error',
              lockBtn: true,
            });
          }
        })
        .catch((e) => {
          if (e?.response?.status) {
            navigate('/message-error');
            reject({
              type: 'username',
              message: 'Пользователь с таким email не найден',
              validateStatus: 'error',
              lockBtn: true,
            });
          } else {
            navigate('/message-error');
            reject({
              type: 'page',
              message: 'Пожалуйста, повторите\n попытку позже',
              /*  validateStatus: 'error',
              lockBtn: true,*/
            });
          }
        });
    });
  };

  return (
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
        }}>
        <Spin spinning={loadingData} />
      </div>
      <IflexProvider
      /*  theme={{
          token: {
            fontSizeHeading1: 32,
          },
        }}*/
      >
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
              width: 416,
              marginTop: '9.59vh',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <PasswordRecoverFormModule
              mode="tenant"
              wrapSx={{
                marginBottom: '126px',
              }}
              subContent={
                <div
                  className="sub-content"
                  style={{
                    fontWeight: '400',
                    whiteSpace: 'pre-line',
                    marginBottom: '40px',
                    marginTop: '0px',
                    textAlign: 'center',
                    lineHeight: 1.4,
                  }}>
                  {`Укажите почту, привязанную\n к вашей учётной записи.\n Мы отправим письмо\n для восстановления пароля`}
                </div>
              }
              circleImgWithSubTxtProps={{
                img: logoPassword(),
                imgWrapSx: {
                  backgroundColor: 'transparent',
                  marginBottom: '15px',
                },
                sx: {
                  gap: 0,
                },
                txtSx: {
                  /* marginBottom: '47px',*/
                  marginBottom: {
                    xs: '30px',
                    md: '47px',
                  },
                  className: 'form-main-header',
                  fontSize: {
                    xs: '30px',
                    md: '38px',
                  },
                  fontWeight: '600',
                  lineHeight: 1.2,
                  letterSpacing: '1px',
                  /* variant: '1212',*/
                },
              }}
              tenantRecoverProps={{
                usernameFormProps: {
                  requiredMark: false,
                },
                tenantsFormProps: {
                  requiredMark: false,
                },
                tenantsFormItemProps: {
                  style: {
                    marginBottom: '6px',
                  },
                },
                usernameInputProps: {
                  onInput: (e) => clearSpaceOnInput(e),
                  onKeyDown: (e) => blockedSpaceKeyDown(e),
                  size: 'large',
                  style: {
                    /*  fontSize: '16px',*/
                    borderRadius: '12px',
                    marginBottom: '4px',
                    padding: '8px 11px 6px',
                  },
                },
                tenantsLabel: 'Выберите компанию',
                usernameSubmitBtnProps: {
                  size: 'large',
                  shape: 'round',
                  style: {
                    fontSize: '16px',
                    borderRadius: '12px',
                    marginTop: '20px',
                    padding: '5px 20px 7px',
                  },
                },
                tenantsSelectProps: {
                  size: 'large',
                  style: {
                    fontSize: '16px',
                    borderRadius: '12px',
                  },
                },
                tenantsSubmitBtnProps: {
                  size: 'large',
                  shape: 'round',
                  style: {
                    fontSize: '16px',
                    borderRadius: '12px',
                    marginTop: '20px',
                    padding: '5px 20px 7px',
                  },
                },
                backBtnProps: {
                  block: true,
                  type: 'link',
                  icon: (
                    <ArrowLeftOutlined
                      style={{
                        marginRight: '8px',
                        position: 'relative',
                        top: '1px',
                      }}
                    />
                  ),
                  style: {
                    color: '#1677FF',
                    fontSize: '16px',
                    borderRadius: '12px',
                    marginTop: '32px',
                  },
                },
                usernameSubmitBtnTxt: 'Восстановить пароль',
                tenantsSubmitBtnTxt: 'Восстановить пароль',
                onUsernameBackClick: () => navigate('/login'),
                usernameBackBtnProps: {
                  block: true,
                  type: 'link',
                  color: 'default',
                  variant: 'link',
                  icon: (
                    <ArrowLeftOutlined
                      style={{
                        marginRight: '8px',
                        position: 'relative',
                        top: '1px',
                      }}
                    />
                  ),
                  style: {
                    color: '#1677FF',
                    fontSize: '16px',
                    borderRadius: '12px',
                    marginTop: '32px',
                  },
                },
              }}
              passwordRecoverProps={{
                formProps: {
                  requiredMark: false,
                },
              }}
              onUsernameFinish={fetchTenantsByEmailPasswordRestore}
              onTenantFinish={handleUserNameFinish}
              customCompanyLogo={{
                markets: [
                  {
                    type: 'iflex',
                    link: 'https://iflex.ru/',
                    linkProps: {
                      target: '_blank',
                    },
                    marketIconProps: {
                      fill: '#8C8C8C',
                    },
                  },
                ],
              }}
            />
          </Box>
        </div>
      </IflexProvider>
    </div>
  );
};

export default PasswordForgotten;
