import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import PostList from '../../components/mypage/PostList';
import CommentList from '../../components/mypage/CommentList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import usePagination from '../../hooks/UsePagination';

  type CommentItem = {
  commentId: string;
  comment: string;
  postTitle: string;
  createdAt: string;
};

  type PostItem = {
  postId: string;
  title: string;
  postImageUrl: string; 
  createdAt: string;
};

const MyLocalBoard = () => {
  const [activeTab, setActiveTab] = useState<'post' | 'comment'>('post');
  const [selectedPeriod, setSelectedPeriod] = useState('기간 조회');
  const [filterRange, setFilterRange] = useState(0);  
  
  const {
    items: postHistory, fetchNextPage, hasNextPage,isFetchingNextPage, isLoading,} = usePagination<PostItem>({
    path: `/myActivity/localBoard/post/${filterRange}`,
    limit: 15, enabled: activeTab === 'post',
  });

  console.log('postHistory len', Array.isArray(postHistory) ? postHistory.length : 'NA');

  

  const {
  items: commentHistory,
  fetchNextPage: cmFetchNextPage,
  hasNextPage: cmHasNextPage,
  isFetchingNextPage: cmIsFetchingNextPage,
  isLoading: cmIsLoading,
  } = usePagination<CommentItem>({
  path: `/myActivity/localBoard/comment/${filterRange}`,
  limit: 15,
  enabled: activeTab === 'comment',
});
console.log(commentHistory);

useEffect(() => {
  
}, [activeTab]);

  return (
    <View style={styles.container}>
      {/* Dropdown */}
    <CustomDropDown
      options={['전체','1개월', '3개월', '6개월', '12개월']}
      selected='기간 조회'
      onSelect={(value) => {
        switch(value){
          case '전체' : {setFilterRange(0); break;}
          case '1개월' : {setFilterRange(1); break;}
          case '3개월' : {setFilterRange(3); break;}
          case '6개월' : {setFilterRange(6); break;}
          case '12개월' : {setFilterRange(12); break;}
        }
        
      }}
      width={wp('90%')}
      buttonStyle={{ backgroundColor: '#fff', marginTop: hp('2%') }}
      textStyle={{ color: '#333' }}
      contentStyle={{
        marginTop: hp('7%'),
        width: wp('90%'),
        backgroundColor: '#FAFFF3',
      }}
    />


  {/* Tab Buttons */}
    <View style={styles.tabRow}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'post' && styles.activeTab]}
        onPress={() => setActiveTab('post')}
      >
        <Text style={[styles.tabText, activeTab === 'post' && styles.activeTabText]}>게시글</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'comment' && styles.activeTab]}
        onPress={() => setActiveTab('comment')}
      >
        <Text style={[styles.tabText, activeTab === 'comment' && styles.activeTabText]}>댓글</Text>
      </TouchableOpacity>
    </View>
      
    {/* Section Title */}
      <Text style={styles.sectionTitle}>
        {activeTab === 'post' ? '작성한 게시글 목록' : '작성한 댓글 목록'}
      </Text>

      {activeTab === 'post' ? (
        <PostList
         key={`post-${activeTab}-${filterRange}`} // 리마운트 
         data={postHistory}
         onEndReached={hasNextPage ? fetchNextPage : undefined}
         isLoading={isFetchingNextPage}
        />
      ) : (
        <CommentList
          key={`comment-${activeTab}-${filterRange}`}
          data={commentHistory} 
          onEndReached={cmHasNextPage ? cmFetchNextPage : undefined}
          isLoading = {cmIsFetchingNextPage}
        />
      )}
    </View>
  );
};


export default MyLocalBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
  },
  tabRow: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    paddingVertical: hp('1.8%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#c3c2c2',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: wp('4%'),
    color: '#848383',
    fontWeight: '700',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    height: hp('5%'),
    textAlignVertical: 'center',
  },
});

