import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import EmailVerification from '../../components/login/EmailVerification';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { SocialSignupState, SocialSignupAction } from '../../types/login/SocialSignupType';


type Props = {
  state: SocialSignupState;
  dispatch: React.Dispatch<SocialSignupAction>;
};


const LocalSignup = ({ state, dispatch}: Props) => {

  return (
    <View>
      <Text>소셜 로그인입니다.</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={state.email}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'email', value: text })}
      />
   
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={state.name}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'name', value: text })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('7.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    fontSize: wp('4%'),
  },
  pwRuleBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('1.5%'),
  },
});

export default LocalSignup;
