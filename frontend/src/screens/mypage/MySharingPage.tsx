import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import SharingList from '../../components/mypage/SharingList';
import SharedList from '../../components/mypage/SharedList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import usePagination from '../../hooks/UsePagination';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import api from '../../api/AxiosInstance';


type SharingItem = {
  postId: number;
  title: string;
  status:'AVAILABLE' | 'RESERVED' ;
  createdAt: string;
};

type SharedListItem = {
  postId: string;
  title: string;
  status: string;
  createAt: string;
};

const MySharing = () => {
  const [activeTab, setActiveTab] = useState<'sharing' | 'sharingRecord'>('sharing');
  const [filterRange, setFilterRange] = useState(0);  
  const {showModal} = useModal();
  const {showToast} = useToast();

    const {
    items: sharingData, fetchNextPage, hasNextPage,isFetchingNextPage, isLoading,refetch} = usePagination<SharingItem>({
    path: `/myActivity/sharing/post/${filterRange}`,
    limit: 15, enabled: activeTab === 'sharing',
  });


  // 나눔 취소 로직 
  const handleCancel =(postId : number) =>{
    showModal({
      type : 'confirm',
      content: '나눔을 취소하시겠습니까?',
      async onConfirm(){
        try{
          const response = await api.get(`myActivity/sharing/cancel/${postId}`);
          if(response.data.code === 'SUCCESS'){
            showToast({ message: '나눔이 취소되었습니다!' });
            refetch();
          }
        }catch(error){console.error('나눔 취소 실패', error)}
      }
    })
  }

  // 나눔 완료 로직 
  const handleComplete =(postId : number) =>{
    showModal({
      type: 'confirm',
      content : '나눔 완료하시겠습니까?',
      async onConfirm(){
        try{
          const response = await api.get(`myActivity/sharing/complete/${postId}`);
          if(response.data.code === 'SUCCESS'){
            showToast({ message: '나눔이 완료되었습니다!' });
            refetch();
          }
        }catch(error){
          console.error('나눔 완료 실패', error);
        }
      }
    })
  }

  

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
        buttonStyle={styles.dropdownButton}
        textStyle={{ color: '#333', fontSize: wp('4%') }} // 대략 15~16px
        contentStyle={{
          marginTop: hp('1%'),
          width: wp('92%'),
          backgroundColor: '#FAFFF3',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      />

      {/* Tab Buttons */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'sharing' && styles.activeTab]}
          onPress={() => setActiveTab('sharing')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'sharing' && styles.activeTabText]}>진행중</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'sharingRecord' && styles.activeTab]}
          onPress={() => setActiveTab('sharingRecord')}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabText, activeTab === 'sharingRecord' && styles.activeTabText]}>나눔 내역</Text>
        </TouchableOpacity>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>
        {activeTab === 'sharing' ? '진행중인 나눔' : '나눔 내역'}
      </Text>

      {activeTab === 'sharing' ? (
        <SharingList data={sharingData}
          onEndReached={hasNextPage? fetchNextPage : undefined}
          isLoading={isFetchingNextPage}
          onCancel={handleCancel}   //  부모 콜백 전달
          onComplete={handleComplete}
        />
      ) : (
                <SharingList data={sharingData}
          onEndReached={hasNextPage? fetchNextPage : undefined}
          isLoading={isFetchingNextPage}
        />
        //  <SharedList data={sharingData}
        //   onEndReached={hasNextPage? fetchNextPage : undefined}
        //   isLoading={isFetchingNextPage}
        //  />
      )}
    </View>
  );
};
export default MySharing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // 좌우 패딩을 퍼센트로 (20px → 4%)
    paddingHorizontal: wp('4%'),
  },
  dropdownButton: {
    backgroundColor: '#fff',
    marginTop: hp('2%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tabRow: {
    flexDirection: 'row',
    marginTop: hp(' 2%'),
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
  },
  tabButton: {
    flex: 1,
    // 최소 터치 영역 보장
    minHeight: hp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#c3c2c2',
  },
  activeTab: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  tabText: {
    fontSize: wp('4.2%'),
    color: '#848383',
    fontWeight: '700' as const,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700' as const,
  },
  sectionTitle: {
    fontSize: wp('4.2%'),
    fontWeight: '600' as const,
    textAlign: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f7f7f7',
    height: hp('5%'),
    textAlignVertical: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
