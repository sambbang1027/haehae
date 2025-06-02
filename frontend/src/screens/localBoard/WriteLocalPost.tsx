import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import type { Asset } from 'react-native-image-picker';

export default function WriteLocalBoardPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [images, setImages] = useState<Asset[]>([]);

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
  };

  //갤러리 열기
  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10, //사진 제한 갯수
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.warn('Gallery error: ', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImages(response.assets);
          setImageUri(response.assets[0].uri || null);
        }
      }
    );
  };

  //이미지 삭제
  const deleteImage = (indexToDelete: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToDelete));
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
            

            {images.length > 0 && (
              <ScrollView horizontal style={styles.imageScroll}>
                {images.map((img, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri: img.uri }} style={styles.previewImage} />
                    <TouchableOpacity
                      onPress={() => deleteImage(index)}
                      style={styles.deleteButton}
                    >
                      <Text style={styles.deleteButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
        </ScrollView>
        <View style={styles.underBar}>
          <TouchableOpacity onPress={openGallery}>
            <Image style={styles.selectImage} source = {require('../../assets/icons/picture.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.postButtonText}>POST</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
            <Text style={styles.postButtonText}>게시하기</Text>
        </TouchableOpacity> */}
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
  },
  imageScroll: {
    marginTop: hp('1%'),
  },
  imageWrapper: {
    position: 'relative',
    marginRight: wp('2.5%'),
    overflow: 'visible',
  },
  previewImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('2%'),
  },
  deleteButton: {
    position: 'absolute',
    top: hp('0.5%'),
    right: wp('1%'),
    backgroundColor: '#ff5555',
    borderRadius: wp('3.5%'),
    width: wp('6%'),
    height: wp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
});

