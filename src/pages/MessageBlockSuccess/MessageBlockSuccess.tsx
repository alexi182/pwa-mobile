import { Box, IflexProvider, Typography, MessageBlock } from '@iflex/iflex-ui';
import { useNavigate } from 'react-router-dom';
import logoPassword from '../../assets/svgFunctions/logoPassword.tsx';

const MessageBlockSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}>
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
              width: 416,
              marginTop: {
                xs: '6vh',
                md: '12.59vh',
              },
              display: 'flex',
              justifyContent: 'center',
            }}>
            <MessageBlock
              subTxt="Восстановление пароля"
              sx={{
                marginBottom: '126px',
                maxWidth: 335,
                width: '100%',
              }}
              circleImgWithSubTxtProps={{
                img: logoPassword(),
                imgWrapSx: {
                  backgroundColor: 'transparent',
                  marginBottom: '9px',
                },
                sx: {
                  gap: 0,
                },
                txtSx: {
                  marginBottom: '53px',
                  fontSize: {
                    xs: '30px',
                    md: '38px',
                  },
                  fontWeight: '600',
                  /*   letterSpacing: '1px',*/
                  lineHeight: 1.2,
                },
              }}
              marketsProps={{
                markets: [],
              }}
              onClick={() => {
                navigate('/login');
              }}
              buttonProps={{
                size: 'large',
                shape: 'round',
                style: {
                  fontSize: '16px',
                  borderRadius: '12px',
                  marginTop: '11px',
                  marginBottom: '86px',
                  padding: '5px 20px 7px',
                },
              }}
              customCompanyLogo={{
                linkProps: {
                  type: 'iflex',
                  link: 'https://iflex.ru/',
                  linkProps: {
                    target: '_blank',
                  },
                },
                marketIconProps: {
                  fill: '#8C8C8C',
                },
              }}>
              <Typography
                style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  whiteSpace: 'pre-line',
                  marginTop: '0px',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}>
                {`Письмо с инструкцией\n по восстановлению пароля\n успешно выслано на адрес\n электронной почты`}
              </Typography>
            </MessageBlock>
          </Box>
        </div>
      </IflexProvider>
    </div>
  );
};
export default MessageBlockSuccess;
