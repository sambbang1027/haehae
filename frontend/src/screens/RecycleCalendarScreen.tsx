import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Button
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// 가운데 로케일 하는 함수
LocaleConfig.locales['ko'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
} as any;
LocaleConfig.defaultLocale = 'ko';

const RecycleCalendar = () => {
  const [memoMap, setMemoMap] = useState<{ [date: string]: string }>({});
  const [selectedDate, setSelectedDate] = useState('');
  const [memoInput, setMemoInput] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    setMemoInput(memoMap[date] || '');
    setModalVisible(true);
  };

  const handleSaveMemo = () => {
    setMemoMap(prev => ({ ...prev, [selectedDate]: memoInput }));
    setModalVisible(false);
  };

  const renderDay = (day: any) => {
    if (!day || !day.dateString) return <View />;
    const memo = memoMap[day.dateString];
    return (
      <TouchableOpacity
        onPress={() => handleDayPress({ dateString: day.dateString, day: day.day })}
        style={styles.dayContainer}
      >
        <Text style={styles.dateText}>{day.day}</Text>
        {memo && <Text style={styles.memoText}>{memo}</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>분리수거 캘린더</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* 위치 박스 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>현재 위치 : 서울시 강남구</Text>
      </View>

      {/* 카드 보이기 */}
      <Calendar
        style={styles.calendar}
        markingType="custom"
        dayComponent={({ date }) => renderDay(date)}
      />

      {/* 하단 안내 */}
      <View style={styles.bottomArea}>
        <Text style={styles.guideTitle}>공휴일 분리배출 안내</Text>
        <View style={styles.noticeBox} />
      </View>

      {/* 모달 - 메모 입력 */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalContentWrapper}
          >
            <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
              <Text style={styles.modalTitle}>{selectedDate} 메모</Text>
              <TextInput
                placeholder="메모 입력"
                value={memoInput}
                onChangeText={setMemoInput}
                style={styles.input}
              />
              <Button title="저장" onPress={handleSaveMemo} />
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default RecycleCalendar;

const styles = StyleSheet.create({
  container: {
    padding: wp('6%'),
    paddingTop: hp('6%'),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: hp('2%'),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: wp('2%'),
  },
  closeText: {
    fontSize: wp('4.5%'),
    color: '#000',
  },
  locationBox: {
    marginTop: hp('3%'),
    padding: wp('4%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
  },
  locationText: {
    fontSize: wp('4%'),
    fontWeight: '500',
  },
  calendar: {
    marginTop: hp('4%'),
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },
  bottomArea: {
    marginTop: 'auto',
    marginBottom: hp('5%'),
  },
  guideTitle: {
    fontSize: wp('4%'),
    fontWeight: '300',
    marginTop: hp('5%'),
    marginBottom: hp('1.5%'),
  },
  noticeBox: {
    height: hp('10%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: hp('1%'),
  },
  moreText: {
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('6%'),
  },
  dateText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
    color: '#333',
  },
  memoText: {
    fontSize: wp('2.5%'),
    marginTop: hp('0.5%'),
    color: '#339966',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentWrapper: {
    width: '100%',
    paddingHorizontal: wp('8%'),
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: wp('2%'),
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    marginBottom: hp('1.5%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    marginBottom: hp('2%'),
  },
});