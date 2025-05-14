import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  // 필요한 페이지 이름과 파라미터 타입 정의
  MyPage: undefined;
  EditProfile: undefined;
};

const EditProfile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSave = () => {
    if (!nickname) {
      setError('닉네임을 입력해주세요.');
    } else {
      setError('');
      console.log('프로필 저장:', nickname);
      // TODO: API 연동
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>프로필</Text>

      <View style={styles.profileImageWrapper}>
        <Image source={require('../../assets/icons/profile.png')} style={styles.profileImage} />
        <View style={styles.editBox}>
          <TouchableOpacity style={styles.editIconWrapper}>
            <Image source={require('../../assets/icons/photo_edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity style={styles.deleteIconWrapper}>
            <Image source={require('../../assets/icons/delete_circle.png')} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>닉네임</Text>
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력해주세요."
        value={nickname}
        onChangeText={setNickname}
      />
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.subText}>
        한글 및 영문, 숫자만 사용 가능하며, 최대 10자 까지만 등록 가능합니다.
      </Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.guideTitle}>안내</Text>
      <Text style={styles.guideText}>
        • 서비스 이용 시 노출되는 닉네임입니다.{"\n"}
        • 닉네임을 변경하면 이전 작성한 글의 닉네임도 같이 변경 됩니다.
      </Text>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#006831',
    marginVertical: 25,
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 121,
    height: 121,
    borderRadius: 60,
  },
  editBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#a1a1a1',
    borderRadius: 3,
    height: 56,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: '#f40000',
    fontSize: 14,
    marginBottom: 5,
  },
  subText: {
    fontSize: 15,
    color: '#909090',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#959595',
    marginVertical: 30,
  },
  guideTitle: {
    fontSize: 17,
    color: '#000',
    marginBottom: 10,
  },
  guideText: {
    fontSize: 15,
    color: '#000',
    lineHeight: 22,
  },
});
