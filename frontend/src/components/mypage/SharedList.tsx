import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppText from '../common/AppText';
import { navigate } from '../../navigation/NavigationService';


export type SharedListItem = {
  historyId: number;
  title: string;
  createdAt: string;
  statusType: string;
};

export type SharedListProps = {
  data: SharedListItem[];
  onEndReached?: () => void;
  isLoading?: boolean;
};

const SharedList = ({data, onEndReached, isLoading}: SharedListProps) => {

  const safeData =
    Array.isArray(data)
      ? data.filter(Boolean).filter(it => it?.historyId != null)
      : [];
console.log('safeData len', safeData.length);


  const goToDetail = (sharingPostId:number) =>{
    navigate('CommunityStack',{screen:'SharingStack', params:{screen:'SharingDetail', params:{sharingPostId}}})
  }


 return ( 
        <View style={{flex:1}}>
           <FlatList
                data={safeData}
                keyExtractor={(item) => item.historyId.toString()}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.3}  
                ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#000" /> : null}
                ListFooterComponentStyle={{ marginTop: hp('1.5%') }}
                ListEmptyComponent={()=>
                  !isLoading ? (
                    <View style={styles.emptyContainer}>
                      <AppText style={styles.emptyText}>나눔한 활동이 없어요 🥲</AppText>
                    </View>
                  ) : null
                }
                renderItem={({ item }) => (
                <View >   
                  <View style={styles.dateBox}>   
                    <AppText style={styles.date}>
                      {(() => {
                        const d = new Date(item.createdAt);
                        const year = d.getFullYear();
                        const month = String(d.getMonth() + 1).padStart(2, '0'); // 0부터 시작이라 +1
                        const day = String(d.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                      })()}
                    </AppText>
                  </View>
                  <View style={styles.card}>
                    <View style={styles.cardLeft}>
                      <Text style={[styles.status, 
                        item.statusType==='나눴습니다'? styles.givenBox : styles.receivedBox]}>
                        {item.statusType==='나눴습니다'? '나눴어요':'받았어요'}
                      </Text>
                      <TouchableOpacity  onPress={()=> goToDetail(item.historyId)}>
                          <AppText style={styles.cardTitle}>{item.title}</AppText>
                      </TouchableOpacity>    
                    </View>
                  </View>
                </View>
                )}
                contentContainerStyle={{ paddingBottom: hp('5%') }}
              />
              <View style={styles.bottomSpacer} />
        </View>
 )
};
export default SharedList;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: hp('2.5%'),
    paddingHorizontal: wp('4%'),
  },
  cardLeft: {
    flexDirection : 'row',
    gap: wp('8%'),
    flexShrink: 1,
  },
  cardTitle: {
    fontSize: wp('4%'),
    fontWeight: '500',
    marginBottom: hp('0.5%'),
    flexShrink: 1,   // 제목이 길 때 줄바꿈 허용
  },
  status: {
    fontSize: wp('3.4%'),
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('3%'),
    textAlignVertical: 'center',
    height: hp('3.3%'),
    overflow: 'hidden',
  },
  givenBox: {
    backgroundColor: '#C8F589',
  },
  receivedBox: {
    backgroundColor: '#e4e4e4',
  },
  date: {
    fontSize: wp('3.0%'),
    color: '#787878',
    marginVertical: hp('1.5%'),
    paddingRight : wp('4%'),
  },
  bottomSpacer: {
    height: hp('6%'),
  },
    emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('10%'),
  },
  emptyText: {
    fontSize: wp('4%'),
    color: '#aaa',
  },
  dateBox: {
    
  flexDirection : 'row',
   justifyContent: 'flex-end',
  }
});
