import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import PostList from '../../components/mypage/PostList';
import CommentList from '../../components/mypage/CommentList';
import axios from 'axios';
import { ImageSourcePropType } from 'react-native'; // 프론트 작업할 때 삭제 요망


const MyLocalBoard = () => {
  const [activeTab, setActiveTab] = useState<'post' | 'comment'>('post');
  const [selectedPeriod, setSelectedPeriod] = useState('기간 조회');
  const [postData, setPostData] = useState<PostItem[]>([]);
  const [commentData, setCommentData] = useState<CommentItem[]>([]);

  type CommentItem = {
  id: string;
  comment: string;
  postTitle: string;
  date: string;
};

  type PostItem = {
  id: string;
  postTitle: string;
  postImage: ImageSourcePropType; // 추후 String 변경 해야함
  date: string;
};

useEffect(() => {
  if (activeTab === 'post') {
    const dummyPostData = [
      {
        id: '1',
        postTitle: '재활용 아이디어 공유',
        postImage: require('../../assets/images/jw.jpeg'),
        date: '2025.01.01',
      },
      {
        id: '2',
        postTitle: '우리 동네 분리수거 팁',
        postImage: require('../../assets/images/jw2.jpeg'),
        date: '2025.01.03',
      },
      {
        id: '3',
        postTitle: '우리 동네 분리수거 팁',
        postImage: '',
        date: '2025.01.03',
      },
    ];
    setPostData(dummyPostData);
  } else {
    const dummyCommentData = [
      {
        id: '1',
        comment: '이거 진짜 유용하네요!',
        postTitle: '재활용 아이디어 공유',
        date: '2025.01.02',
      },
      {
        id: '2',
        comment: '어디에 버려야 할지 궁금했는데 감사합니다.',
        postTitle: '우리 동네 분리수거 팁',
        date: '2025.01.04',
      },
    ];
    setCommentData(dummyCommentData);
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
        <PostList data={postData} />
      ) : (
        <CommentList data={commentData} />
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

export default MyLocalBoard;

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
});

