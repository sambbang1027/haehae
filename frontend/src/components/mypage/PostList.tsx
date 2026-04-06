import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { navigate } from '../../navigation/NavigationService';

export type PostItem = {
  postId: string;
  title: string;
  postImageUrl: string; 
  createdAt: string;
};

export type MyPostProps = {
  data: PostItem[];
  onEndReached? : () => void;
  isLoading? : boolean;
};

const MyPost = ({data, onEndReached, isLoading}: MyPostProps) => {
    const safeData =
    Array.isArray(data)
      ? data.filter(Boolean).filter(it => it?.postId != null)
      : [];
console.log('safeData len', safeData.length);


  const routeToDetail = (id : number) => {
    navigate('CommunityStack',{screen: 'LocalBoardStack', params:{screen: 'LocalBoardDetail', params:{id}}})
  }

 return ( 
        <View>
          <FlatList
            data={safeData}
            extraData={{ len: safeData.length }}
            keyExtractor={(item) => item.postId.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingHorizontal: wp('4%'),
            }}
            contentContainerStyle={{
              paddingBottom: hp('26%'),
              paddingTop: hp('2%'),
            }}
            onEndReached={onEndReached}
            ListFooterComponent={
              isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : null
            }
            ListEmptyComponent={
              !isLoading?(
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>아직 작성한 게시글이 없어요 🥲</Text>
                </View>
              ) : null       
            }
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => routeToDetail(Number(item.postId))}>
              <View style={styles.card}>
                <View style={styles.cardImage}>
                  {item.postImageUrl ? (
                    <Image
                      source={{ uri: item.postImageUrl }}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.noImageBox}>
                      <Image
                        source={require('../../assets/icons/noPhoto.png')}
                        style={styles.noImage}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.date}>{item.createdAt}</Text>
                </View>
              </View>
            </TouchableOpacity>
            )}
          />
          <View style={styles.bottomSpacer} />
        </View>
        
 )
};
export default MyPost;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: hp('2%'),
    width: wp('40%'), // 한 줄에 2개일 때 적당한 카드 폭
    marginBottom: hp('2%'),
  },
  cardInfo: {
    alignItems: 'center',
    paddingTop: hp('1%'),
  },
  cardTitle: {
    fontSize: wp('4.2%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: wp('3.8%'),
    color: '#787878',
  },
  label: {
    fontSize: wp('3.8%'),
    color: '#787878',
  },
  date: {
    fontSize: wp('3.6%'),
    color: '#787878',
  },
  bottomSpacer: {
    height: hp('6%'),
  },
  cardImage: {
    width: '100%',
    height: hp('18%'),
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  noImageBox: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImage: {
    width: wp('20%'),
    height: wp('20%'),
    tintColor: '#aaa',
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
});
