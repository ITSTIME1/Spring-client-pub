'use client';
import {React, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
  styled
} from '@mui/material/styles';

const Q1 = styled("div")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  width: `100vw`,
  height: `100vh`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  overflow: `auto`
});

const Q2 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(0, 0, 0, 1)`,
  fontStyle: `normal`,
  fontFamily: `Noto Sans KR`,
  fontWeight: `400`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  position: `absolute`,
  top: `54px`,
});

const Component2 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,
  top: `183px`,
});

const Rectangle26 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `32px`,
});

const Q3 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,
  top: `0px`,
});

const Q4 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(153, 153, 153, 1)`,
  fontStyle: `normal`,
  fontFamily: `Poppins`,
  fontWeight: `300`,
  fontSize: `14px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `304px`,
  height: `21px`,
  position: `absolute`,

  top: `46px`,
});

const Component3 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,

  top: `290px`,
});

const Rectangle261 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `27px`,
});

const Q5 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,
  top: `0px`,
});

const Q6 = styled("input")({
    border: `1px solid rgba(153, 153, 153, 0.25)`,
    boxSizing: `border-box`,
    borderRadius: `6px`,
    width: `320px`,
    height: `50px`,
    position: `absolute`,
    left: `0px`,
    top: `32px`,
    color: '#000', // 글자 색상을 검정색으로 설정
    backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

const Component7 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,
  top: `795px`,
});

const Rectangle262 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `27px`,
});

const Q7 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,

  top: `0px`,
});

const Q8 = styled("input")({
    textAlign: `left`,
    border: `1px solid rgba(153, 153, 153, 0.25)`,
    boxSizing: `border-box`,
    borderRadius: `6px`,
    width: `320px`,
    height: `50px`,
    position: `absolute`,
    left: `0px`,
    top: `32px`,
    color: '#000', // 글자 색상을 검정색으로 설정
    backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

const Component10 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,

  top: `676px`,
});

const Rectangle263 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `27px`,
});

const Q9 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,

  top: `0px`,
});

const Q10 = styled("input")({
    border: `1px solid rgba(153, 153, 153, 0.25)`,
    boxSizing: `border-box`,
    borderRadius: `6px`,
    width: `320px`,
    height: `50px`,
    position: `absolute`,
    left: `0px`,
    top: `32px`,
    color: '#000', // 글자 색상을 검정색으로 설정
    backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

const Component4 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,

  top: `397px`,
});

const Rectangle264 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `27px`,
});

const Q11 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,

  top: `0px`,
});

const Q12 = styled("input")({
    border: `1px solid rgba(153, 153, 153, 0.25)`,
    boxSizing: `border-box`,
    borderRadius: `6px`,
    width: `320px`,
    height: `50px`,
    position: `absolute`,
    left: `0px`,
    top: `32px`,
    color: '#000', // 글자 색상을 검정색으로 설정
    backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

const Component6 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `87px`,

  top: `507px`,
});

const Rectangle265 = styled("div")({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `27px`,
});

const Q13 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(34, 34, 34, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  width: `306px`,
  position: `absolute`,

  top: `0px`,
});

const Q14 = styled("input")({
    border: `1px solid rgba(153, 153, 153, 0.25)`,
    boxSizing: `border-box`,
    borderRadius: `6px`,
    width: `320px`,
    height: `50px`,
    position: `absolute`,
    left: `0px`,
    top: `32px`,
    color: '#000', // 글자 색상을 검정색으로 설정
    backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

const MdiEyeOff = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `24px`,
  height: `24px`,
  left: `294px`,
  top: `436px`,
  overflow: `hidden`,
});

const Vector = styled("img")({
  height: `19px`,
  width: `22px`,
  position: `absolute`,
  left: `1px`,
  top: `3px`,
});

const MdiEyeOff1 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `24px`,
  height: `24px`,
  left: `295px`,
  top: `547px`,
  overflow: `hidden`,
});

const Vector1 = styled("img")({
  height: `19px`,
  width: `22px`,
  position: `absolute`,
  left: `1px`,
  top: `3px`,
});

const Group101 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,
  height: `60px`,
  top: `953px`,
});

const Rectangle31 = styled("div")({
  backgroundColor: `rgba(48, 79, 254, 1)`,
  borderRadius: `6px`,
  width: `320px`,
  height: `60px`,
  position: `absolute`,
  left: `0px`,
  top: `0px`,
});

const Q15 = styled("div")({
textAlign: `center`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `700`,
  fontSize: `20px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  lineHeight: `24px`,
  textTransform: `none`,
  position: `absolute`,
  top: `18px`,
});

const MingcuteLeftLine = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `32px`,
  height: `32px`,
  left: `9px`,
  top: `52px`,
  overflow: `hidden`,
});

const Group = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `32px`,
  height: `32px`,
  left: `0px`,
  top: `0px`,
});

const Vector2 = styled("img")({
  height: `32px`,
  width: `32px`,
  position: `absolute`,
  left: `0px`,
  top: `0px`,
});

const Vector3 = styled("img")({
  height: `17.75px`,
  width: `10.23px`,
  position: `absolute`,
  left: `11px`,
  top: `7px`,
});

const Frame66 = styled("div")({
  display: `flex`,
  position: `absolute`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `320px`,

  top: `119px`,
  height: `31px`,
});

const Frame65 = styled("div")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  border: `1px solid rgba(153, 153, 153, 0.6)`,
  boxSizing: `border-box`,
  borderRadius: `4px`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `6px 16px`,
  width: `96px`,
  margin: `0px`,
  height: `31px`,
});

const Q16 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(0, 0, 0, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  margin: `0px`,
});

const Frame64 = styled("div")({
  backgroundColor: `rgba(48, 79, 254, 1)`,
  border: `1px solid rgba(153, 153, 153, 1)`,
  boxSizing: `border-box`,
  borderRadius: `4px`,
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `6px 16px`,
  width: `96px`,
  margin: `0px 0px 0px 16px`,
  height: `31px`,
});

const Q17 = styled("div")({
  textAlign: `left`,
  whiteSpace: `pre-wrap`,
  fontSynthesis: `none`,
  color: `rgba(255, 255, 255, 1)`,
  fontStyle: `normal`,
  fontFamily: `Roboto`,
  fontWeight: `400`,
  fontSize: `16px`,
  letterSpacing: `0px`,
  textDecoration: `none`,
  textTransform: `none`,
  margin: `0px`,
});

const Line7 = styled("div")({
  border: `1px solid rgba(0, 0, 0, 0.12)`,
  width: `300px`,
  height: `0px`,
  position: `absolute`,

  top: `644px`,
});



const InputField = styled('input')({
  border: `1px solid rgba(153, 153, 153, 0.25)`,
  boxSizing: `border-box`,
  borderRadius: `6px`,
  width: `320px`,
  height: `50px`,
  position: `absolute`,
  left: `0px`,
  top: `32px`,
  color: '#000', // 글자 색상을 검정색으로 설정
  backgroundColor: '#fff', // 배경색을 흰색으로 설정
});

function SalarRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessNumber: '',
        contact: '', // 상태 객체의 키와 일치
        password: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleClick = async () => {

        // 폼 검증
        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('https://www.springgreens.store/signup/retail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
                
            });
            console.log(formData);

            if (response.ok) {
                alert('회원가입이 완료되었습니다!');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('서버와의 연결에 문제가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const moveDomestic = () => {
        router.push("/domestic");
    };

    return (
        <Q1>
            <Q2>{`회원가입`}</Q2>
            <Component2>
                <Q3>{`이름`}</Q3>
                <InputField
                    type="text"
                    name="name"
                    placeholder="이름을 입력해 주세요"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Component2>
            <Component3>
                <Q5>{`이메일`}</Q5>
                <Q6
                    type='text'
                    name="email"
                    placeholder="이메일을 입력해 주세요"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Component3>
            <Component7>
                <Q7>{`사업자등록번호`}</Q7>
                <Q8
                    type='text'
                    name="businessNumber"
                    placeholder='사업자등록번호를 입력해 주세요'
                    value={formData.businessNumber}
                    onChange={handleChange}
                />
            </Component7>
            <Component10>
                <Q9>{`대표자 연락처`}</Q9>
                <Q10
                    type='text'
                    name="contact"
                    placeholder='가게 대표자 전화번호를 입력해 주세요'
                    value={formData.contact}
                    onChange={handleChange}
                />
            </Component10>
            <Component4>
                <Q11>{`비밀번호`}</Q11>
                <Q12
                    type='password'
                    name="password"
                    placeholder='비밀번호를 입력해 주세요'
                    value={formData.password}
                    onChange={handleChange}
                />
            </Component4>
            <Component6>
                <Q13>{`비밀번호 확인`}</Q13>
                <Q14
                    type='password'
                    name="confirmPassword"
                    placeholder='비밀번호를 입력해 주세요'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            </Component6>
            <Group101>
                <Rectangle31 onClick={handleClick}></Rectangle31>
                <Q15>{`회원가입 완료`}</Q15>
            </Group101>
            <Frame66>
                <Frame65 onClick={moveDomestic}>
                    <Q16>{`도매`}</Q16>
                </Frame65>
                <Frame64>
                    <Q17>{`소매`}</Q17>
                </Frame64>
            </Frame66>
            <Line7></Line7>
        </Q1>
    );
}

export default SalarRegister;

  