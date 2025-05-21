import React, { useState } from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import InquiryForm from '../../components/mypage/InquiryForm';
import AppText from '../../components/common/AppText';
import InquiryHistory from '../../components/mypage/InquiryHistory';

const Inquiry = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  return (
    <View style={styles.container}>
         {/* 탭 영역 */}
        <View style={styles.tabBar}>
            <TouchableOpacity
                style={[styles.inactiveTab, activeTab === 'form' && styles.activeTab]}
                onPress={() => setActiveTab('form')}
            >
                <AppText style={activeTab === 'form' ? styles.activeTabText : styles.inactiveTabText}>문의하기</AppText>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.inactiveTab, activeTab === 'history' && styles.activeTab]}
                onPress={() => setActiveTab('history')}
            >
                <AppText style={activeTab === 'history' ? styles.activeTabText : styles.inactiveTabText}>문의내역</AppText>
            </TouchableOpacity>
        </View>
      {activeTab === 'form' ? <InquiryForm /> : <InquiryHistory />}
    </View>
  );
};

export default Inquiry;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  tabBar: {
    flexDirection: 'row',
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: '#c3c2c2',
  },
  activeTab: {
    width: '50%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveTab: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  inactiveTabText: {
    color: '#959595',
    fontSize: 18,
    fontWeight: '700',
  },
});
