import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
type PointHistoryItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  point: string;
  type: 'plus' | 'minus';
};

const dummyData: PointHistoryItem[] = [
  {
    id: '1',
    date: '2025.01.01',
    title: '미션 적립',
    description: '미션 내용',
    point: '+100P',
    type: 'plus',
  },
  {
    id: '2',
    date: '2025.01.03',
    title: '환경 기부',
    description: '기부 재단',
    point: '-500P',
    type: 'minus',
  },
  {
    id: '3',
    date: '2025.01.04',
    title: '미션 적립',
    description: '미션 내용',
    point: '+200P',
    type: 'plus',
  },
  {
    id: '4',
    date: '2025.01.05',
    title: '환경 기부',
    description: '기부 재단',
    point: '-100P',
    type: 'minus',
  },
];

const PointRecord = () => {
  const renderItem = ({ item }: { item: PointHistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text
          style={[
            styles.point,
            item.type === 'plus' ? styles.plus : styles.minus,
          ]}
        >
          {item.point}
        </Text>
      </View>
    </View>
  );

  return (
  <FlatList
    data={dummyData}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={
      <View>
        {/* 포인트 요약 */}
        <View style={styles.summary}>
          <Text style={styles.availableText}>사용 가능한 포인트</Text>
          <View style={styles.pointRow}>
            <Image source={require('../../assets/icons/point-icon.png')} style={styles.pointIcon} />
            <Text style={styles.totalPoint}>1,040P</Text>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.devider} />

        {/* 드롭다운 */}
        <Text style={styles.sectionTitle}>적립/사용 내역</Text>
        
    <CustomDropDown
        options={['1개월', '3개월', '6개월', '12개월']}
        selected="3개월"
        onSelect={(value) => console.log('선택한 기간:', value)}
        width={355}
        buttonStyle={{ backgroundColor: '#fff' }}
        textStyle={{ color: '#333' }}
        contentStyle={{ marginTop: 40, width:355, backgroundColor: '#FDF8FF',}}
    />

        {/* 리스트 헤더 */}
        <View style={styles.listHeader}>
          <Text style={styles.headerText}>내용</Text>
          <Text style={styles.headerText}>적립/사용</Text>
        </View>
      </View>
    }
    renderItem={({ item }) => (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text
          style={[
            styles.point,
            item.type === 'plus' ? styles.plus : styles.minus,
          ]}
        >
          {item.point}
        </Text>
      </View>
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    ListFooterComponent={
    <View>
      <View style={styles.divider}>
        <Text style={styles.guideTitle}>안내</Text>
      </View>
        <Text style={styles.guideText}>• 포인트는 1년의 유효기간이 있습니다.</Text>
    </View>
     
    }
    contentContainerStyle={{ paddingBottom: 40 ,backgroundColor : '#fff'}}
  />
);
};

export default PointRecord;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summary: {
    backgroundColor: 'rgba(249, 235, 255, 0.51)',
    borderRadius: 10,
    padding: 30,
    height: 160,
    width: '100%'
  },
  devider:{
    height:6,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  availableText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  totalPoint: {
    fontSize: 40,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal : 20,
  },
  card: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f6f6f6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 15,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginHorizontal: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    color: '#777',
    marginTop: 4,
  },
  point: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  plus: {
    color: '#3e5fff',
  },
  minus: {
    color: '#d02222',
  },
  divider: {
    height: 50,
    marginVertical: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: '#959595',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  guideTitle: {
    fontSize: 17,
    marginHorizontal: 20,
  },
  guideText: {
    fontSize: 15,
    marginHorizontal: 20,
    color: '#000'
  }
});
