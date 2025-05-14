import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

interface Props {
  navigation: any;
}

const FindPwPage: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);


    const handleTimer = () => {
        if(intervalId){
            clearInterval(intervalId);
        }
        setTimer(180);
        const id = setInterval(()=>{
            setTimer((prev)=>{
                if(prev<=1){
                    clearInterval(id);
                    return 0;
                }
                return prev -1;
            });
        },1000);
        setIntervalId(id);
    };

    const goToSetPw = () => {
        navigation.navigate('SetPw');
    }

  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.subtitle}>
            Haehae에 가입했던 이메일을 입력해주세요.{'\n'}
            비밀번호 재설정 인증번호를 보내드립니다.
            </Text>
        </View>
    <View style={styles.inputConatainer}>
        <View style={styles.inputBox}>
            <TextInput
                style={styles.input}
                placeholder='이메일 입력'
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.codeButton} onPress={handleTimer}>
            <Text style={styles.codeText}>인증번호 전송</Text>
            </TouchableOpacity> 
        </View>
        <View style={styles.inputBox}>
            <TextInput 
                style={styles.input}
                placeholder='인증번호 입력'
                value={authCode}
                onChangeText={setAuthCode}
            />
            <TouchableOpacity style={styles.codeButton}><Text style={styles.codeText}>확인</Text></TouchableOpacity>
                {timer > 0 && (
                    <Text style={styles.timer}>
                    {String(Math.floor(timer / 60)).padStart(2, '0')}:
                    {String(timer % 60).padStart(2, '0')}
                    </Text>
                )}
        </View>    
    </View>
       
      <TouchableOpacity style={styles.submitButton} onPress={goToSetPw}>
        <Text style={styles.submitText}>비밀번호 재설정</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>안내</Text>
      </View>
      <Text style={styles.notice}>
        • 소셜 회원가입(Google, Kakao)을 진행하신 회원은 해당 사이트에서 비밀번호를 찾을 수 있습니다.
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    position: 'relative',
  },
  headerBox:{
    flexDirection:'column',
    gap: 30,
    marginBottom: 30,
    marginLeft: 30,
  },
  logo: {
    marginTop: 40,
    width: 138,
    height: 39,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#000',
    lineHeight: 28,
  },
  inputConatainer:{
    gap: 15,
    alignItems: 'center'
  },
  input: {
    width: 358,
    height: 55,
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 3,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 25,
    width: 358,
    height: 55,
    borderRadius: 5,
    backgroundColor: '#C8F589',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  submitText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 55,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  footerTitle: {
    fontSize: 17,
    color: '#000',
    paddingHorizontal: 20,
  },
  notice: {
    fontSize: 15,
    color: '#000',
    width: 350,
    marginVertical: 30,  // 상하
    marginHorizontal: 20 // 좌우
  },
  codeButton: {
    position: 'absolute',
    right: 3,
    top: 6,
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  codeText: {
    color: '#5da000',
    fontWeight: 'bold',
  },
  timer: {
     marginLeft: 5 ,
     marginBottom: 10, 
     color: 'green', 
     fontWeight: 500,
     fontSize: 15,
  },
});
export default FindPwPage;