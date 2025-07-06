import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PasswordRecovery.less';
import { Box, IflexProvider, PasswordChangeModule } from '@iflex/iflex-ui';
import { Spin } from 'antd';
import type {
  FinishError,
  FinishSuccess,
  IPasswordRequirements,
} from '../model/types/types.ts';
import {
  blockedSpaceKeyDown,
  clearSpaceOnInput,
} from '../../../shared/utils/clearSpaceInput/clearSpaceInput.ts';
import logoPassword from '../../../assets/svgFunctions/logoPassword.tsx';
import { observer } from 'mobx-react-lite';
import { fetchPasswordRequirements } from '../model/services/getPasswordRecovery.ts';
import { clientUnAuthorized } from '../../../shared/auth-service/AuthServiceInt.ts';
import { resetPasswordApi } from '../../../shared/api/resetPassword/resetPasswordApi.ts';

const PasswordRecovery = observer(() => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [passwordRecovery, setPasswordRecovery] =
    useState<IPasswordRequirements>({ description: [], pattern: '' });
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    fetchPasswordRequirements().then((data) => {
      setPasswordRecovery(data);
    });
  }, []);

  const checkPassword = (password: string): Promise<boolean | string[]> => {
    return new Promise((resolve, reject) => {
      const errors: string[] = [];
      if (!new RegExp(passwordRecovery?.pattern).test(password)) {
        errors.push('Пароль слишком простой');
      }

      if (password) {
        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve(true);
        }
      } else {
        reject(errors);
      }
    });
  };

  const handleSubmit = (
    password: string,
  ): Promise<FinishSuccess | FinishError> => {
    setLoadingData(true);

    const token = searchParams.get('token') || '';
    return new Promise((resolve, reject) => {
      clientUnAuthorized
        .post(
          resetPasswordApi({
            password,
            token,
          }),
        )
        .then(() => {
          resolve({
            type: 'page',
            message: '',
          });
        })
        .catch((e) => {
          if (e?.response?.status === 422) {
            navigate('/message-expired');
            reject({
              type: 'page',
              message: 'Срок действия ссылки истёк',
              /*  validateStatus: 'error',*/
              /*lockBtn: true,*/
            });
          } else if (e?.response?.status === 500) {
            if (
              e?.response?.data?.message ===
              'Пароль не должен совпадать ни с одним из 1 предыдущих'
            ) {
              reject({
                type: 'password',
                message: 'Новый пароль совпадает с текущим',
                validateStatus: 'error',
                lockBtn: true,
              });
            } else {
              navigate('/message-error');
              reject({
                type: 'page',
                message: 'Пожалуйста, повторите\n попытку позже',
                /* validateStatus: 'error',
                lockBtn: true,*/
              });
            }
          } else {
            navigate('/message-error');
            reject({
              type: 'username',
              message: 'Пожалуйста, повторите\n попытку позже',
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

  const rules = passwordRecovery?.description
    ?.map((item: string) => item)
    .join('\n');

  //const str: any = `В пароле должны присутствовать:\n\n${rules}`;

  const str = () => {
    return (
      <>
        <div
          style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>
          В пароле должны присутствовать:
        </div>
        <span>{rules}</span>
      </>
    );
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
              marginTop: {
                xs: '6vh',
                md: '12.59vh',
              },
              display: 'flex',
              justifyContent: 'center',
            }}>
            <PasswordChangeModule
              wrapSx={{
                marginBottom: '126px',
              }}
              formWrapSx={{
                marginBottom: '120px',
              }}
              circleImgWithSubTxtProps={{
                img: logoPassword(),
                imgWrapSx: {
                  backgroundColor: 'transparent',
                  marginBottom: '20px',
                },
                sx: {
                  gap: 0,
                  /*   marginBottom: '51px',*/
                  marginBottom: {
                    xs: '30px',
                    md: '51px',
                  },
                },
                txtSx: {
                  /*   marginBottom: '51px',*/
                  className: 'form-main-header',
                  fontSize: {
                    xs: '30px',
                    md: '38px',
                  },
                  fontWeight: '600',
                  lineHeight: 1,
                  letterSpacing: '1px',
                  /* variant: '1212',*/
                },
              }}
              onFinish={handleSubmit}
              changePasswordProps={{
                formProps: {
                  requiredMark: false,
                },
                additionalPasswordCheck: checkPassword,
                passwordTxtProps: {
                  sx: {
                    textAlign: 'left',
                    fontSize: '14px',
                    whiteSpace: 'pre-line',
                    marginBottom: '20px',
                  },
                },
                /* passwordTxt: `В пароле должны присутствовать:\n\n${rules}`,*/
                passwordTxt: str() as any,
                strongPasswordHelpTxt: 'Пароль надёжный',
                stronPasswordHelp: !!passwordRecovery?.pattern,
                submitBtnProps: {
                  size: 'large',
                  shape: 'round',
                  style: {
                    fontSize: '16px',
                    borderRadius: '12px',
                    marginTop: '12px',
                    padding: '5px 20px 7px',
                  },
                },
                passwordFormItemProps: {
                  style: {
                    marginBottom: '43px',
                  },
                },
                passwordInputProps: {
                  onInput: (e) => clearSpaceOnInput(e),
                  onKeyDown: (e) => blockedSpaceKeyDown(e),
                  size: 'large',
                  style: {
                    /*fontSize: '16px',*/
                    borderRadius: '12px',
                    marginBottom: '4px',
                    padding: '8px 11px 6px',
                  },
                },
                repeatFormItemProps: {
                  style: {
                    marginBottom: '7px',
                  },
                },
                repeatInputProps: {
                  onInput: (e) => clearSpaceOnInput(e),
                  onKeyDown: (e) => blockedSpaceKeyDown(e),
                  size: 'large',
                  style: {
                    /*fontSize: '16px',*/
                    borderRadius: '12px',
                    marginBottom: '4px',
                    padding: '8px 11px 6px',
                  },
                },
              }}
              afterFinishBtnProps={{
                size: 'large',
                shape: 'round',
                style: {
                  fontSize: '16px',
                  borderRadius: '12px',
                  marginTop: '32px',
                  padding: '5px 20px 7px',
                },
              }}
              afterFinishMsgSx={{
                fontSize: '20px',
                whiteSpace: 'pre-line',
                lineHeight: 1.4,
                marginBottom: '2px',
              }}
              successSubTxt="Пароль изменён"
              afterFinishBtnTxt="Ok"
              afterFinishOkClick={() => {
                navigate('/login');
              }}
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
});

export default PasswordRecovery;
