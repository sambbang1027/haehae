import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../api/AxiosInstance';
import { RewardParamList } from '../../navigation/RewardNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useModal } from '../../context/ModalContext';
import { formatTOKSTDateTime } from "../../utils/TimeStampToConvert";


type RewardScreenNavigationProp = RouteProp<RewardParamList,'RewardPay'>;

const RewardPay = () => {
  const route = useRoute<RewardScreenNavigationProp>(); 
  const { userPointId } = route.params;
  const {showModal, hideModal} = useModal();
  
  interface payResultData{
    id : number,
    amount : number,
    createdAt : string,
    name : string,
    rewardItemsImgUrl : string[]
  }

  const [payResult, setPayResult] = useState<payResultData | null>(null);

  useEffect(() => {
    RewardPayDetail(userPointId);
  }, [userPointId]);

  const RewardPayDetail = async(userPointId :number) => {
    try{
      const res = await api.get(`/pay/result/${userPointId}`);
      setPayResult(res.data);
      console.log(res.data);
    }catch(error :any){
      const message =
        error.response?.data?.message ||
        error.message
        '알 수 없는 오류가 발생했습니다.';
      showModal({
                type:'confirm',
                content : message,
            }) 
    }
  }

  const refundEvent = async()=> {
      try{
          const res = await api.post(`userReward/pay/refund/${userPointId}`);
            showModal({
                  type:'confirm',
                  content : `${res.data}`,
              }) 
        }catch(error : any){
                const message =
                error.response?.data?.message ||
                error.message
                '알 수 없는 오류가 발생했습니다.';
                showModal({
                    type:'confirm',
                    content : message,
                }) 
        }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContentContainer} 
      >
        <Text style={styles.paymentCompleteText}>결제가 완료 되었습니다!</Text>
        <Image source={{uri: payResult?.rewardItemsImgUrl[0]}} style={styles.paymentImage} />
        <Text style={styles.donationTitle}>{payResult?.name}</Text>
        <Text style={styles.pointId}>결제번호 : {payResult?.id}</Text>
        <Text style={styles.paymentDate}>결제일시 : {payResult && formatTOKSTDateTime(payResult.createdAt)}</Text>
        <Text style={styles.usedPoints}>사용한 포인트 : {payResult?.amount.toLocaleString()}p</Text>
        <TouchableOpacity style={styles.refundButtonContainer} onPress={refundEvent}>
          <Text style= {styles.RefundButton}>
            결제 취소
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // Remove alignItems: 'center' from here
  },
  scrollViewContentContainer: {
    alignItems: 'center', // Add alignItems: 'center' here
  },
  paymentCompleteText: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('6%'), // Roughly 24px
    fontWeight: '400',
    opacity: 0.5,
    marginTop: hp('5%'), // Adjust as needed
    width: wp('80%'), // Adjusted width
  },
  paymentImage: {
    width: wp('57.3%'), 
    height: wp('57.3%'), 
    objectFit: 'cover',
    marginTop: hp('2.3%'),
    borderRadius : wp('3%')
  },
  donationTitle: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('5.5%'), 
    fontWeight: '400',
    marginTop: hp('3.1%'), 
    width: wp('80%'), 
  },
  pointId : {
    color: '#d8d4d4',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('4.5%'), 
    fontWeight: '400',
    marginTop: hp('3%'), 
    width: wp('80%'), 
  },
  paymentDate: {
    color: '#d8d4d4',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('4.5%'),
    fontWeight: '400',
    marginTop: hp('1.2%'), 
    width: wp('80%'), 
  },
  usedPoints: {
    color: '#d8d4d4',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('4.5%'), 
    fontWeight: '400',
    marginTop: hp('1.2%'), 
    width: wp('80%'), 
  },
  refundButtonContainer: {
    backgroundColor: '#D1FF90',     
    paddingVertical: hp('2%'),    
    paddingHorizontal: wp('5%'),    
    borderRadius: 8,                
    marginTop: hp('6%'),
    width: wp('80%'),
    alignItems: 'center',           
  },
  RefundButton: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    width: wp('80%'), 
  }
});

export default RewardPay;