import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export type CommentItem = {
  commentId: string;
  comment: string;
  postTitle: string;
  createdAt: string;
};

export type MyCommentProps = {
  data: CommentItem[];
  onEndReached? : () => void;
  isLoading? : boolean; 
};

const MyComment = ({data, onEndReached, isLoading}: MyCommentProps) => {
 return ( 
        <View>
           <FlatList
                data={data}
                keyExtractor={(item) => item.commentId.toString()}
                onEndReached={onEndReached}
                ListFooterComponent={isLoading ? (<ActivityIndicator size="small" color="#000" />) : null}
                ListEmptyComponent={
                !isLoading ? (
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>아직 작성한 댓글이 없어요 🥲</Text>
                  </View>
                ) : null
              }
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.cardTitle}>{item.comment}</Text>
                      <Text style={styles.cardDesc}>{item.postTitle}</Text>
                    </View>
                    <View style={styles.cardRight}>
                      <Text style={styles.date}>{item.createdAt}</Text>
                    </View>
                  </View>
                )}
              contentContainerStyle={{ paddingBottom: hp('10%'), paddingTop: hp('1%') }}
              />
        
              <View style={styles.bottomSpacer} />
        </View>
 )
};
export default MyComment;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('4%'),
  },
  cardLeft: {
    flexShrink: 1,
    marginRight: wp('2%'),
  },
  cardRight: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  cardTitle: {
    fontSize: wp('4.3%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  cardDesc: {
    fontSize: wp('3.8%'),
    color: '#787878',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: wp('3.8%'),
    color: '#787878',
  },
  date: {
    fontSize: wp('3.8%'),
    color: '#787878',
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

});
