import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';

const RewardPay = () => {
  const navigation = useNavigation(); 

  const handleRewardPayList = () => {
    navigation.navigate('RewardPayList');
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContentContainer} 
      >
        <Text style={styles.paymentCompleteText}>결제가 완료 되었습니다!</Text>
        <Image source={require('../../assets/chimchak.png')} style={styles.paymentImage} />
        <Text style={styles.donationTitle}>불우이웃 재헌이 돕기</Text>
        <Text style={styles.paymentDate}>결제일시 : 2025.04.28 17시 59분</Text>
        <Text style={styles.usedPoints}>사용한 포인트 : 1,000P</Text>
        <TouchableOpacity onPress={handleRewardPayList}>
          <Text>확인용-결제목록 페이지 이동</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
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
    width: wp('57.3%'), // Roughly 252px
    height: wp('57.3%'), // Maintain aspect ratio (square)
    objectFit: 'cover',
    marginTop: hp('2.3%'), // Adjust as needed
  },
  donationTitle: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('8%'), // Roughly 32px
    fontWeight: '400',
    marginTop: hp('3.1%'), // Adjust as needed
    width: wp('80%'), // Adjusted width
  },
  paymentDate: {
    color: '#d8d4d4',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('5.5%'), // Roughly 24px
    fontWeight: '400',
    marginTop: hp('6.2%'), // Adjust as needed
    width: wp('80%'), // Adjusted width
  },
  usedPoints: {
    color: '#d8d4d4',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    fontSize: wp('5.5%'), // Roughly 24px
    fontWeight: '400',
    marginTop: hp('1.2%'), // Adjust as needed
    width: wp('80%'), // Adjusted width
  },
});

export default RewardPay;