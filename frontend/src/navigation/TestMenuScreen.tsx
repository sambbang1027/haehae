import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TestMenuScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 테스트 메뉴</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RecycleCalendar')}
      >
        <Text style={styles.buttonText}>📅 분리수거 캘린더</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BulkWasteApply')}
      >
        <Text style={styles.buttonText}>🗑️ 대형 폐기물 신청</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WasteRestrictionGuide')}
      >
        <Text style={styles.buttonText}>🚮 배출 제한 가이드 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CollectionBoxLocation')}
      >
        <Text style={styles.buttonText}>📍 수거함 위치 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PloggingPlace')}
      >
        <Text style={styles.buttonText}>🚶 플로깅 위치 보기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AiDisposalEntry')}
      >
        <Text style={styles.buttonText}>🤖 AI 분리배출 가이드</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});