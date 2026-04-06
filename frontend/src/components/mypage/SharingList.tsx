import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useModal } from '../../context/ModalContext';
import AppText from '../common/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '../../navigation/NavigationService';

export type SharingItem = {
  postId: number;
  title: string;
  status:  'AVAILABLE' | 'RESERVED' 
  createdAt: string;
};

export type MySharingProps = {
  data: SharingItem[];
  onEndReached?: () => void;
  isLoading?: boolean;
  onCancel : (postId : number) => void;
  onComplete : (postId : number) => void; 
};

const SharingList = ({ data, onEndReached, isLoading, onCancel, onComplete }: MySharingProps) => {
  const { showModal, hideModal } = useModal();


  const handleSharing = (status: 'AVAILABLE' | 'RESERVED', postId : number) => {
    const isAvailable = status === 'AVAILABLE';
    showModal({
      type: 'bottom',
      content: (
        <View style={styles.modalBox}>
          <View style={styles.modalSection}>
            <TouchableOpacity
              onPress={() => {
                hideModal();
                if(isAvailable){
                  // 나눔 취소 처리 
                  onCancel(postId);
                }else{
                  // 나눔 완료 처리 
                  onComplete(postId);
                }

              }}
              activeOpacity={0.8}
            >
              <AppText style={{ color: '#5DA000', fontWeight: '700' }}>
                {isAvailable ? '나눔 취소' : '나눔 완료'}</AppText>
            </TouchableOpacity>

            <View style={styles.devider} />

            <TouchableOpacity onPress={hideModal} activeOpacity={0.8}>
              <AppText style={{ fontWeight: '700' }}>닫기</AppText>
            </TouchableOpacity>
          </View>
        </View>
      ),
    });
  };


    const safeData =
    Array.isArray(data)
      ? data.filter(Boolean).filter(it => it?.postId != null)
      : [];
console.log('safeData len', safeData.length);

  const goToDetail = (sharingPostId:number) =>{
    navigate('CommunityStack',{screen:'SharingStack', params:{screen:'SharingDetail', params:{sharingPostId}}})
  }

  return (
    <View>
      <FlatList
        data={safeData}
        extraData={{ len: safeData.length }}
        keyExtractor={(item) => item.postId.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#000" /> : null}
        ListFooterComponentStyle={{ marginTop: hp('1.5%') }}
        ListEmptyComponent={()=>
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <AppText style={styles.emptyText}>나눔 중인 게시글이 없어요 🥲</AppText>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: hp('6%') }}
        renderItem={({ item }) => {
          return(
          <View style={styles.cardContainer}> 
            <View style={styles.dateBox}>   
                <Text style={styles.sharingDate}>{item.createdAt}</Text> 
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={()=> goToDetail(item.postId)}> 
                <View style={styles.cardLeft}>
                  <Text
                    style={[
                      styles.status,
                      item.status === 'AVAILABLE'
                        ? { backgroundColor: '#C8F589' } // 나눔중 배경
                        : { backgroundColor: '#f9aa60ff' } // 예약중 배경
                    ]}
                  >{item.status === 'AVAILABLE' ? '나눔중' : '예약중'}</Text>
                  <AppText style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </AppText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardRight} onPress={()=>handleSharing(item.status, item.postId)} 
                activeOpacity={0.8} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Image source={require('../../assets/icons/right_arrow.png')} style={styles.rightArrow} />
              </TouchableOpacity>
            </View>     
         </View>
          ) 
          }}
      />
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export default SharingList;

const styles = StyleSheet.create({
  cardContainer:{
    flexDirection: 'column'
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: hp('3%a'),
    paddingRight: wp('1%'),
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('6%'),
    flex: 1,
    paddingRight: wp('3%'),
  },
  cardRight: {
    justifyContent: 'center',
    marginRight: wp('2%'),
  },
  cardTitle: {
    fontSize: wp('4.3%'), // ~16-17px
    fontWeight: '500',
    maxWidth: '75%',
  },
  status: {
    fontSize: wp('3.8%'),
    backgroundColor: '#C8F589',
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.3%'),
    minHeight: hp('3.2%'),
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  bottomSpacer: {
    height: hp('6%'),
  },
  rightArrow: {
    width: wp('4%'),
    height: wp('4%'),
    tintColor: '#959595',
    resizeMode: 'contain',
  },
  modalBox: {
    justifyContent: 'center',
    flexDirection: 'column',
    paddingVertical: hp('2%'),
  },
  modalSection: {
    alignItems: 'center',
    gap: hp('1.6%'),
  },
  devider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginTop: hp('1%'),
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
  sharingDate:{
    fontSize: wp('3.4%'),
    marginVertical: hp('2%'),
  },
  dateBox:{

  }
});
