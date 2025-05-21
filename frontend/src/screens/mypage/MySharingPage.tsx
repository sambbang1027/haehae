import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import SharingList from '../../components/mypage/SharingList';
import SharedList from '../../components/mypage/SharedList';
import axios from 'axios';



const MySharing = () => {
  const [activeTab, setActiveTab] = useState<'sharing' | 'sharingRecord'>('sharing');
  const [selectedPeriod, setSelectedPeriod] = useState('기간 조회');
  const [sharingData, setSharingData] = useState<SharingItem[]>([]);
  const [sharedListData, setSharedListData] = useState<SharedList[]>([]);

  type SharingItem = {
  id: string;
  sharingTitle: string;
  status: string;
};

  type SharedList = {
  id: string;
  sharingTitle: string;
  status: string; 
  date: string;
};

useEffect(() => {
  if (activeTab === 'sharing') {
    const dummySharingData = [
      {
        id: '1',
        sharingTitle: '선풍기 나눔 합니다',
        status: 'sharing'
      },
      {
        id: '2',
        sharingTitle: '네스프레소 나눔',
        status: 'sharing'
      },
    ];
    setSharingData(dummySharingData);
  } else {
    const dummySharedListData = [
      {
        id: '1',
        sharingTitle: '전기포트 나눔!',
        status: 'given',
        date: '2025.01.02',
      },
      {
        id: '2',
        sharingTitle: '에어컨 나눔',
        status: 'received',
        date: '2025.01.04',
      },
    ];
    setSharedListData(dummySharedListData);
  }
}, [activeTab]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const periodParam = convertPeriodToDays(selectedPeriod); // 예: '1개월' -> 30
  //     try {
  //       if (activeTab === 'post') {
  //         const res = await axios.get(`/api/posts?period=${periodParam}`);
  //         setPostData(res.data);
  //       } else {
  //         const res = await axios.get(`/api/comments?period=${periodParam}`);
  //         setCommentData(res.data);
  //       }
  //     } catch (err) {
  //       console.error('데이터 불러오기 실패', err);
  //     }
  //   };

  //   fetchData();
  // }, [activeTab, selectedPeriod]);

  return (
    <View style={styles.container}>
      {/* Dropdown */}
    <CustomDropDown
        options={['전체','1개월', '3개월', '6개월', '12개월']}
        selected={selectedPeriod}
        onSelect={(value) => {console.log('선택한 기간:', value),setSelectedPeriod(value)}}
        width={355}
        buttonStyle={{ backgroundColor: '#fff', marginTop:20 }}
        textStyle={{ color: '#333' }}
        contentStyle={{ marginTop: 60, width:355, backgroundColor: '#FAFFF3', }}
      />
  {/* Tab Buttons */}
    <View style={styles.tabRow}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'sharing' && styles.activeTab]}
        onPress={() => setActiveTab('sharing')}
      >
        <Text style={[styles.tabText, activeTab === 'sharing' && styles.activeTabText]}>진행중</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'sharingRecord' && styles.activeTab]}
        onPress={() => setActiveTab('sharingRecord')}
      >
        <Text style={[styles.tabText, activeTab === 'sharingRecord' && styles.activeTabText]}>나눔 내역</Text>
      </TouchableOpacity>
    </View>
      
    {/* Section Title */}
      <Text style={styles.sectionTitle}>
        {activeTab === 'sharing' ? '진행중인 나눔' : '나눔 내역'}
      </Text>

      {activeTab === 'sharing' ? (
        <SharingList data={sharingData} />
      ) : (
        <SharedList data={sharedListData} />
      )}
    </View>
  );
};

const convertPeriodToDays = (label: string): number => {
  switch (label) {
    case '1개월': return 30;
    case '3개월': return 90;
    case '6개월': return 180;
    default: return 30;
  }
};

export default MySharing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: 20,
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
});

