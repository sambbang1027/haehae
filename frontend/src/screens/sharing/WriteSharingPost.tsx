import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import type { Asset } from 'react-native-image-picker';
import Modal from 'react-native-modal';

export default function WriteSharingPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [images, setImages] = useState<Asset[]>([]);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['전자기기', '가구', '생활용품', '의류', '기타'];

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('카테고리:', selectedCategory);
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 10,
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

  const deleteImage = (indexToDelete: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ flex: 1 }}>
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

            {selectedCategory && (
              <View style={styles.categoryBadgeContainer}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{selectedCategory}</Text>
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(null)}
                    style={styles.categoryDeleteButton}
                  >
                    <Text style={styles.categoryDeleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.bottomActionBar}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={openGallery}>
                <Image
                  style={styles.selectImage}
                  source={require('../../assets/icons/picture.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
                <Image
                  style={styles.selectImage}
                  source={require('../../assets/icons/tags.png')}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.postButtonText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={isCategoryModalVisible}
          onBackdropPress={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>카테고리 선택</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  setSelectedCategory(category);
                  setCategoryModalVisible(false);
                }}
                style={styles.categoryOption}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
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
    paddingBottom: hp('10%'),
  },
  input: {
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    height: hp('6.5%'),
    textAlignVertical: 'top',
    fontSize: wp('4.5%'),
    backgroundColor: 'white',
  },
  textArea: {
    height: hp('50%'),
    textAlignVertical: 'top',
  },
  imageScroll: {
    marginTop: hp('1.5%'),
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
  bottomActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('3%'),
    paddingLeft: wp('5%'),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  selectImage: {
    width: wp('13%'),
    height: wp('13%'),
    marginRight: wp('4%'),
  },
  postButtonText: {
    fontSize: wp('4.3%'),
    fontWeight: 'bold',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('5%'),
    color: 'black',
  },
  categoryBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('5%'),
  },
  categoryBadgeText: {
    fontSize: wp('3.8%'),
    color: '#00796b',
    fontWeight: '600',
  },
  categoryDeleteButton: {
    marginLeft: wp('2%'),
    backgroundColor: '#ff5555',
    borderRadius: wp('2.5%'),
    width: wp('5%'),
    height: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryDeleteButtonText: {
    color: 'white',
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: wp('3%'),
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
  },
  categoryOption: {
    paddingVertical: hp('1.2%'),
  },
  categoryText: {
    fontSize: wp('4%'),
  },
});
