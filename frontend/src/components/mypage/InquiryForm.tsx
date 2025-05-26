import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import CustomDropDown from '../common/CustomDropDown';
import ImagePicker from '../common/ImagePicker';


const InquiryScreen = () => {
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* 카테고리 */}
      <Text style={styles.label}>카테고리</Text>
      <CustomDropDown 
        options={['회원관리','나눔마켓','기타']}
        selected='카테고리'
        onSelect={(value)=>{console.log('선택한 카테고리',value)}}
        width={355}
        buttonStyle={{ backgroundColor: '#fff', marginTop:5 }}
        textStyle={{color:'#rrr'}}
        contentStyle={{ marginTop: 45, width:355, backgroundColor: '#FAFFF3', }}
      />

      {/* 문의 내용 */}
      <Text style={styles.label}>문의내용</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={10}
        maxLength={2000}
        value={content}
        onChangeText={setContent}
        placeholder='문의 내용을 입력해주세요. (2000자 이내)'
      />

      {/* 이미지 안내 */}
      <Text style={styles.subText}>
        10MB이하 이미지파일 (JPG,PNG,GIF) 3개를 첨부할 수 있어요.
      </Text>

      <ImagePicker />

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>등록</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InquiryScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginTop: 20,
    marginLeft: 30,
  },
  subText: {
    fontSize: 15,
    color: '#7e7e7e',
    marginTop: 8,
    marginHorizontal: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c3c2c2',
    borderRadius: 7,
    marginHorizontal: 25,
    marginTop: 10,
    height: 50,
    paddingHorizontal: 15,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#b0b0b0',
    marginHorizontal: 29,
    marginTop: 10,
    height: 303,
    padding: 15,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    borderRadius: 5,
    paddingVertical: 15,
    width : '80%',
    alignItems: 'center'
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
});
