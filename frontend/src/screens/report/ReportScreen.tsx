import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const categories = ['욕설/비방', '광고/도배', '허위', '기타'];

export default function ReportForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reportContent, setReportContent] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>신고 글 작성</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedCategory ?? '신고 카테고리'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal visible={isDropdownVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(item);
                  setDropdownVisible(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <TextInput
        style={styles.textArea}
        multiline
        placeholder="신고 내용을 입력해주세요."
        value={reportContent}
        onChangeText={setReportContent}
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>신고</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('3%'),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  dropdownText: {
    fontSize: wp('3.8%'),
    color: '#333',
  },
  dropdownIcon: {
    fontSize: wp('4%'),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: wp('10%'),
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: hp('1%'),
  },
  dropdownItem: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
  },
  textArea: {
    height: hp('25%'),
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: wp('4%'),
    borderRadius: 4,
    marginBottom: hp('4%'),
    fontSize: wp('3.8%'),
  },
  submitButton: {
    backgroundColor: '#d4f88a',
    paddingVertical: hp('2.2%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    color: '#000',
  },
});
