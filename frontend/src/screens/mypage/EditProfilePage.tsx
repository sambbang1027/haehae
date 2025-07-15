import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useToast } from '../../context/ToastContext';
import api from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext';
import { useImagePicker } from '../../hooks/UseImagePicker';
import { navigate } from '../../navigation/NavigationService';
import { useFireBaseImage } from '../../hooks/UseFirebaseImage';
import { Asset } from 'react-native-image-picker';


const EditProfile = () => {

  const {user, setUser} = useUser();
  const [nickname, setNickname] = useState<string>('');
  const [profile , setProfile] = useState<Asset | null >(null);
  const {showToast} = useToast();
  const { images, pickImages } = useImagePicker();
  const { uploadImage, deleteImageFB, uploading, error } = useFireBaseImage();
useEffect(() => {
  if (user?.nickname) {
    setNickname(user.nickname);
  }

  // user의 기존 프로필 이미지도 Asset처럼 만들어 profile에 넣기
  if (user?.profileImage && !profile) {
    const fakeAsset: Asset = {
      uri: user.profileImage,
      fileName: 'profile.jpg',
      type: 'image/jpeg',
      fileSize: 0,
      width: 0,
      height: 0,
    };
    setProfile(fakeAsset);
  }
}, [user]);

  const handleSave = async() => {
    let uploadedImageUrls: string[] | null = null;
    try{
      if(nickname == null){
        showToast({
          message : '닉네임을 입력하세요.'
        });
      }
        if(profile?.uri){
            uploadedImageUrls = await uploadImage([profile], 'profile_image' );
          }
      const response = await api.post('/user/edit/profile',{
        nickname : nickname,
        profileImageUrl : uploadedImageUrls,
        userId : user?.userId
      });
      if(response.data.code === 'SUCCESS'){
        setUser({
          ...user!,
          userId: user!.userId,
           nickname,
          profileImage: uploadedImageUrls?.[0] || user!.profileImage,
        })
        showToast({
          message : '수정되었습니다.'
        });
        navigate('MyPageStack',{screen:'SettingPage'});
      }
    }catch(error){
       if(uploadedImageUrls != null && uploadedImageUrls.length > 0){
              await deleteImageFB(uploadedImageUrls);
        }
          console.error('프로필 저장 실패', error);
    }
  };

  const handleDuplicateNickname = async() =>{
    if(nickname.trim() == ''){
      showToast({message: '닉네임을 입력해주세요'});
    return;
    }

    try{
      const response = await api.get('/user/register/check/nickname',{
       params: {
        nickname: nickname,
      },
    });
      if(response.data.data === false){
        showToast({message : '사용가능한 닉네임입니다'})
      }else if(response.data.data === true){
        showToast({message: '이미 사용중인 닉네임입니다'})
      }
    }catch(error){
      showToast({message: '네트워크 오류 발생 \n 다시 시도해주세요.'});
      console.error(error);
    }
  };

const handleImages = async () => {
  try {
      await pickImages(); 
      console.log(images);
      if(images && images[0]?.uri){
        setProfile(images[0]);
      }
    }
   catch (err) {
    console.warn('이미지 선택 실패:', err);
  }
};

  const deleteImage =() =>{
    setProfile(null);
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>프로필</Text>

      <View style={styles.profileImageWrapper}>
        <Image 
          source={
            profile?.uri
              ? { uri: profile.uri, cache: 'reload' }
              : require('../../assets/icons/profile.png')
          }
          key={profile?.uri || 'default'}
          style={styles.profileImage}
        />


        <View style={styles.editBox}>
          <TouchableOpacity style={styles.editIconWrapper} onPress={handleImages}>
            <Image source={require('../../assets/icons/photo_edit.png')} style={styles.editIcon} />
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity style={styles.deleteIconWrapper} onPress={deleteImage}>
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
        <TouchableOpacity style={styles.duplication} onPress={handleDuplicateNickname}>
          <Text style={styles.dupText}>중복 확인</Text>
        </TouchableOpacity>

      <Text style={styles.subText}>
        한글 및 영문, 숫자만 사용 가능하며, 최대 10자 까지만 등록 가능합니다.
      </Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.guideTitle}>안내</Text>
      <View style={styles.divider} />
      <Text style={styles.guideText}>
        • 서비스 이용 시 노출되는 닉네임입니다.{"\n"}
      </Text>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#006831',
    marginVertical: hp('3%'),
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
  },
  editBox: {
    flexDirection: 'row',
    gap: wp('2%'),
    alignItems: 'center',
  },
  editIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  label: {
    fontSize: wp('4%'),
    fontWeight: '700',
    color: '#000',
    marginBottom: hp('1.5%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#a1a1a1',
    borderRadius: 3,
    height: hp('6.5%'),
    paddingHorizontal: wp('4%'),
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
  },
  errorText: {
    color: '#f40000',
    fontSize: wp('3.5%'),
    marginBottom: hp('1%'),
  },
  subText: {
    fontSize: wp('3.8%'),
    color: '#909090',
    marginBottom: hp('4%'),
  },
  saveButton: {
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    borderRadius: 5,
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%')
  },
  saveButtonText: {
    fontSize: wp('4%'),
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#959595',
    marginVertical: hp('1.3%'),
  },
  guideTitle: {
    fontSize: wp('4.2%'),
    color: '#000',
    marginBottom: hp('1%'),
  },
  guideText: {
    fontSize: wp('3.8%'),
    color: '#000',
    lineHeight: hp('2.8%'),
  },
    duplication:{
    position: 'absolute',
    right: wp('2%'),
    top: hp('33.7%'),
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  dupText:{
   color: '#5da000',
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  editIconWrapper: {

  },
  deleteIconWrapper:{

  }
});
