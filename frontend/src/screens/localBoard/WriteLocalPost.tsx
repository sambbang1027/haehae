import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../api/AxiosInstance';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useUser } from '../../context/UserContext';
//firebase 이미지
import { uploadImageToFirebase } from '../../utils/FirebaseUploader';
import { deleteImageFromFirebase } from '../../utils/FirebaseDelete';
//image hooks 관리
import { useImagePicker } from '../../hooks/useImagePicker';
//imagePriview UI
import ImagePreviewList from '../../components/image/ImagePreviewList';

export default function WriteLocalBoardPost() {
  const {user, setUser} = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { images, pickImages, deleteImage } = useImagePicker();
  

  const handleSubmit =  async () =>{
    let uploadedImageUrls: string[] = []; 

    try {
      if(images != null && images.length > 0){
        uploadedImageUrls = await Promise.all(
          images.map(img => uploadImageToFirebase(img, 'localboard_image'))
        );
    }

      const formData = {
        userId : user?.userId,
        regionCode : "1168010300",
        title: title,
        content: content,
        localBoardImageUrl: uploadedImageUrls
      };

      await api.post('local-board/detail/create', formData);

      console.log('게시글 등록 성공!');
    } catch (error) {
      console.error('게시글 등록 실패:', error);

      if(uploadedImageUrls != null && uploadedImageUrls.length > 0){
          await Promise.all(
        uploadedImageUrls.map(url => deleteImageFromFirebase(url))
        );
      }
    }
  };


  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput
            style={styles.input}
            value={title}
            keyboardType="default"
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
            />

            <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            keyboardType="default"
            onChangeText={setContent}
            placeholder="내용을 입력하세요"
            multiline
            />
            
          <ImagePreviewList images={images} onDelete={deleteImage} />

        </ScrollView>
        <View style={styles.underBar}>
          <TouchableOpacity onPress={pickImages}>
            <Image style={styles.selectImage} source = {require('../../assets/icons/picture.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.postButtonText}>게시하기</Text>
        </TouchableOpacity> 
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: wp('5%'),
  },
  input: {
    borderColor: '#ccc',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    height: hp('6.5%'),
    textAlignVertical: 'top',
    fontSize: wp('4.5%'),
  },
  textArea: {
    height: hp('50%'),
    textAlignVertical: 'top',
  },
  underBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    height: hp('8%'),
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  postButtonText: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginRight: wp('4.5%'),
    lineHeight: hp('4%'),
    marginBottom: hp('-0.5%'),
  },
  selectImage: {
    width: wp('13%'),
    height: wp('13%'),
    marginTop: hp('2%'),
    marginLeft: wp('5%'),
    marginBottom: hp('1.5%'),
  }
});

