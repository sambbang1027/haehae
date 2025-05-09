import React, { useState } from 'react';
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
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#000',
  },
  locationBox: {
    marginTop: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
  },
  calendar: {
    marginTop: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bottomArea: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 40,
    marginBottom: 8,
  },
  noticeBox: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  moreButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  moreText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  memoText: {
    fontSize: 10,
    marginTop: 2,
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
    paddingHorizontal: 32,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
  },
});
