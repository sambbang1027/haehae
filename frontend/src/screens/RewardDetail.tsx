import React from 'react';
import {
    View,
    Text,
    Image, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const handlerPayPress = () => {

}

const RewardDetail = () => {
    return (
        <ScrollView style={styles.container}>

            <View style={styles.mainContent}>
                <Text style={styles.donationTitle}>불우이웃 재헌이 돕기</Text>
                <View style={styles.donationInfo}>
                    <Text style={styles.date}>2024년 4월 23일</Text>
                    <Text style={styles.organization}>동서남북 기부단체</Text>
                </View>
                <Image style={styles.donationImage} source={require('../assets/chimchak.png')} resizeMode="cover" />
                <Text style={styles.donationDescription}>
                    세상을 구하는게 영웅이 아닙니다. 배고픈 재헌이에게 작은 도움의 손길을 내미는 것. 작지만 따뜻한 손길이 재헌이한테 영웅이 될 수 있습니다. 밥 한 끼 사주세요.
                </Text>
                <View style={styles.paymentSummary}>
                    <View style={styles.paymentItem}>
                        <Image style={styles.payImg} source={require('../assets/chimchak.png')} />
                        <Text style={styles.paymentLabel}>결제금액</Text>
                        <Text style={styles.paymentAmount}>1,000p</Text>
                    </View>
                </View>

                {/* Available Points */}
                <View style={styles.availablePointsCard}>
                    <Text style={styles.availablePointsLabel}>현재 사용가능한 포인트</Text>
                    <Text style={styles.availablePoints}>1080p</Text>
                </View>
            </View>

            {/* Bottom Background */}
            <TouchableOpacity onPress={handlerPayPress}> 
            <View style={styles.bottomBackground}>
                <Text style={styles.payText}>결 제 하 기</Text>
            </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    mainContent: {
        paddingHorizontal: wp('4%'),
        paddingTop: hp('2%'),
    },
    donationTitle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: hp('4%'),
        fontWeight: 'bold',
        marginBottom: hp('3%'),
    },
    donationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp('0.1%'),
    },
    date: {
        color: '#000000',
        textAlign: 'left',
        fontSize: hp('1.7%'),
        marginLeft:wp('5%'),
        fontWeight: '400',
    },
    organization: {
        color: '#000000',
        textAlign: 'right',
        fontSize: hp('1.7%'),
        marginRight : wp('5%'),
        fontWeight: '400',
    },
    donationImage: {
        width: wp('65%'),
        height: wp('65%'),
        alignSelf: 'center',
        marginBottom: hp('2.5%'),
        marginTop: hp('2.5%'),
    },
    donationDescription: {
        color: '#000000',
        textAlign: 'left',
        fontSize: hp('2.2%'),
        fontWeight: '400',
        lineHeight: hp('3.2%'),
        marginBottom: hp('2%'),
    },
    paymentSummary: {
        borderTopWidth: 2,
        borderColor: '#c4c4c4',
        paddingTop: hp('2.5%'),
        marginBottom: hp('2%'),
    },
    paymentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
        borderBottomWidth: 1,
        borderColor: '#d8d4d4',
    },
    payImg : {
        width : wp('20%'),
        height : hp('20%'),
        resizeMode: 'contain',
    },
    paymentLabel: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.2%'),
        fontWeight: '400',
    },
    paymentAmount: {
        color: '#000000',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.2%'),
        fontWeight: '400',
    },
    availablePointsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderColor: '#d8d4d4',
        borderWidth: 1,
        padding: hp('2%'),
        marginBottom: hp('2.5%'),
    },
    availablePointsLabel: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.2%'),
        fontWeight: '400',
        marginBottom: hp('1%'),
    },
    availablePoints: {
        color: '#000000',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.2%'),
        fontWeight: '400',
    },
    bottomBackground: {
        backgroundColor: '#dafcac',
        left: 0,
        right: 0,
        bottom: 0,
        height: hp('12%'),
    },
    payText : {
        fontSize :wp('8%'),
        fontWeight : 'bold',
        color : 'white',
        marginTop : '5%',
        marginLeft : '30%'


    }
});

export default RewardDetail;