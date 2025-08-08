import React, { useState , useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import api from '../../api/AxiosInstance';
import AppText from '../../components/common/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import usePagination from '../../hooks/UsePagination';


type MissonItem = {
  missionId: number;
  completedAt: string;
  missionType: string;
  missionPoint : number;
  missionContent: string;
};


const MyMission = () => {
  const [filterRange, setFilterRange] = useState(1);  
  const {
    items: missionHistory, fetchNextPage, hasNextPage,isFetchingNextPage, isLoading,} = usePagination<MissonItem>({
    path: `/myActivity/missionHistory/${filterRange}`,
    limit: 15,
  });

  console.log(missionHistory);

  
  return (
    <View style={styles.container}>
      <CustomDropDown
        options={['1개월', '3개월', '6개월', '12개월']}
        selected="기간 조회"
        onSelect={(value) => {
              switch (value) {
                case '1개월': setFilterRange(1); break;
                case '3개월': setFilterRange(3); break;
                case '6개월': setFilterRange(6); break;
                case '12개월': setFilterRange(12); break;
                default: setFilterRange(1); break;
              }
            }}
        width={355}
        buttonStyle={{ backgroundColor: '#fff', marginTop:20 }}
        textStyle={{ color: '#333' }}
        contentStyle={{ marginTop: 60, width:355, backgroundColor: '#FAFFF3', }}
      />


      {/* Section Title */}
      <AppText style={styles.sectionTitle}>미션 참여 기록</AppText>

      {/* Volunteer Cards */}
   <FlatList
        data={missionHistory}
        keyExtractor={(item) => item.missionId.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <AppText style={styles.cardTitle}>{item.missionType}</AppText>
              <AppText style={styles.cardDesc}>{item.missionContent}</AppText>
            </View>
            <View style={styles.cardRight}>
              <AppText style={styles.date}>{item.completedAt}</AppText>
              <AppText style={styles.cardPoint}>+{item.missionPoint}P</AppText>
            </View>
          </View>
        )}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#000" /> : null}
        onEndReached={() => {
            if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{ paddingBottom : 40,flexGrow: 1 }}
      />

      <View style={styles.bottomSpacer} />
    </View>
  );
};
export default MyMission;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5.5%'), // 20 기준
  },
  tabRow: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.8%'), // 14 기준
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#c3c2c2',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: wp('4.5%'), // 16 기준
    color: '#848383',
    fontWeight: '700',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: wp('4.5%'), // 16 기준
    fontWeight: '700',
    textAlign: 'center',
    borderTopWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#F7F7F7',
    height: hp('5%'), // 40 기준
    textAlignVertical: 'center',
    marginTop: hp('2.5%'), // 20 기준
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: hp('2.5%'), // 20 기준
  },
  cardLeft: {
    width: wp('60%')
  },
  cardRight: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  cardTitle: {
    fontSize: wp('4.7%'), // 17 기준
    fontWeight: '500',
    marginBottom: hp('1.2%'), // 10 기준
  },
  cardDesc: {
    fontSize: wp('4.2%'), // 15 기준
    color: '#787878',

  },
  label: {
    fontSize: wp('4.2%'), // 15 기준
    color: '#787878',
  },
  date: {
    fontSize: wp('4.2%'), // 15 기준
    color: '#787878',
  },
  cardPoint: {
    marginBottom: hp('2.5%'),
    color : '#5153FF',
  },
  bottomSpacer: {
    height: hp('6.2%'), // 50 기준
  },
});
