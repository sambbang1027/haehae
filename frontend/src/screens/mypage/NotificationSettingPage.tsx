import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import AppText from '../../components/common/AppText';
import axios from 'axios';


const NotificationSettings = () => {

 const toggleRecycle = async (value: boolean) => {
  setRecycleAlert(value);
  await axios.post('/api/notifications/recycle', { enabled: value });
};
 const toggleChat = async (value: boolean) => {
  setChatAlert(value);
  await axios.post('/api/notifications/chat', { enabled: value });
};
const toggleMission = async (value: boolean) => {
  setMissionAlert(value);
  await axios.post('/api/notifications/mission', { enabled: value });
};



  const [recycleAlert, setRecycleAlert] = useState(true);
  const [chatAlert, setChatAlert] = useState(true);
  const [missionAlert, setMissionAlert] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      {/* 설명 문구 */}
      <AppText style={styles.description}>분리수거, 채팅, 미션 등 다양한 정보를 알려드려요.</AppText>

      {/* 알림 항목 */}
     <View style={styles.previewBox}>
      <View style={styles.item}>
        <AppText style={styles.itemText}>분리수거 알림</AppText>
        <Switch value={recycleAlert} onValueChange={toggleRecycle} 
            trackColor={{ false: '#ccc', true: '#93eb18' }}
            thumbColor={recycleAlert ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.item}>
        <AppText style={styles.itemText}>채팅 알림</AppText>
        <Switch value={chatAlert} onValueChange={toggleChat}
            trackColor={{ false: '#ccc', true: '#93eb18' }}
            thumbColor={chatAlert ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.item}>
        <AppText style={styles.itemText}>미션 알림</AppText>
        <Switch value={missionAlert} onValueChange={toggleMission} 
            trackColor={{false: '#ccc', true: '#93eb18'}}
            thumbColor={missionAlert? '#ffffff' : '#f4f3f4'}
        />
      </View>
      </View> 
    </ScrollView>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingTop: 30,
  },
  description: {
    fontSize: 16,
    color: '#898989',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%'
  },
  itemText: {
    fontWeight: '700',
    color: '#000',
  },
  previewBox: {
    backgroundColor: '#fff',
    margin: 25,
    height: 180,
    borderColor: '#f7f7f7',
    borderWidth: 1,
    borderRadius: 7,
    elevation: 2,
    padding : 20
  },
});
