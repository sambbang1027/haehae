import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,  } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import axios from 'axios';

type VolunteerItem = {
  id: string;
  name: string;
  description: string;
  date: string;
};

const MyVolunteer = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'activity'>('apply');
  const [data, setData] = useState<VolunteerItem[]>([]);


useEffect(() => {
  const dummyData: VolunteerItem[] = [
    {
      id: '1',
      name: '봉사활동',
      description: '봉사 활동 설명',
      date: '2025.01.01',
    },
  ];
  setData(dummyData);
}, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const endpoint =
  //         activeTab === 'apply'
  //           ? '/api/volunteer/applications'
  //           : '/api/volunteer/activities';
  //       const response = await axios.get(endpoint);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('데이터 불러오기 실패:', error);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab]);

  
  return (
    <View style={styles.container}>
      <CustomDropDown
        options={['전체','1개월', '3개월', '6개월', '12개월']}
        selected="기간 조회"
        onSelect={(value) => console.log('선택한 기간:', value)}
        width={355}
        buttonStyle={{ backgroundColor: '#fff', marginTop:20 }}
        textStyle={{ color: '#333' }}
        contentStyle={{ marginTop: 60, width:355, backgroundColor: '#FAFFF3', }}
      />
      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'apply' && styles.activeTab]}
          onPress={() => setActiveTab('apply')}
        >
          <Text style={[styles.tabText, activeTab === 'apply' && styles.activeTabText]}>신청 내역</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'activity' && styles.activeTab]}
          onPress={() => setActiveTab('activity')}
        >
          <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>활동 내역</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
          {activeTab === 'apply' ? '봉사 신청 내역' : '봉사 활동 내역'}
        </Text>

      {/* Volunteer Cards */}
   <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <View style={styles.bottomSpacer} />
    </View>
  );
};
export default MyVolunteer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tabRow: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#c3c2c2',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#848383',
    fontWeight:700
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor:'#ccc',
    backgroundColor:'#f0f0f0',
    height: 40,
    textAlignVertical:'center'
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20,
  },
  cardLeft: {},
  cardRight: { alignItems: 'flex-end', flexDirection:'column-reverse' },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
     marginBottom: 10
  },
  cardDesc: {
    fontSize: 15,
    color: '#787878',
  },
  label: {
    fontSize: 15,
    color: '#787878',
  },
  date: {
    fontSize: 15,
    color: '#787878',
  },
  bottomSpacer: {
    height: 50,
  },
});

