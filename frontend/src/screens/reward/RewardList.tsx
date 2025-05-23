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
// import Header from '../../components/MainHeader';
// import Footer from '../../components/Footer';

const RewardList = () => {
    const navigation = useNavigation(); 

    // const handleItemClick = (itemId: number) => {
    //     navigation.navigate('RewardDetail');
    //     console.log(`아이템 ID ${itemId} 클릭됨`);
    // };

    const handleItemClick = () => {
        navigation.navigate('RewardDetail');
    };

    const rewardItems = [
        { id: 1, title: '인천시 나무심기 기부', points: '1,000p', imageSrc: require('../../assets/images/tree.png'), topPosition: hp('50%') },
        { id: 2, title: '산불 피해 이웃 돕기', points: '1,000p', imageSrc: require('../../assets/images/chimchack.png'), topPosition: hp('57%') },
        { id: 3, title: '불우이웃 재헌이 돕기', points: '1,000p', imageSrc: require('../../assets/images/faker.png'), topPosition: hp('64%') },
        { id: 4, title: '불우이웃 도훈이 돕기', points: '100,000p', imageSrc: require('../../assets/images/iu.png'), topPosition: hp('71%') },
    ];

    return (
        <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}
        contentContainerStyle={styles.scrollViewContent}>
            {/* <Header /> */}
            <Image style={styles.pointIcon} source={require('../../assets/images/reward-coin.png')} resizeMode="contain" />
            <Text style={styles.currentPointsText}>현재 킹도훈님의 포인트</Text>
            <Text style={styles.totalPoints}>1,080P</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={styles.pointDonationButton}>
                    <Text style={styles.pointDonationText}>포인트 기부</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabText}>상품권</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabButton}>
                    <Text style={styles.tabText}>쿠폰/기프티콘</Text>
                </TouchableOpacity>
            </View>
            {rewardItems.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.listItem]}
                    // onPress={() => handleItemClick(item.id)}
                    onPress={handleItemClick}
                >
                    <Image style={styles.itemImage} source={item.imageSrc} />
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPoints}>{item.points}</Text>
                </TouchableOpacity>
            ))}
    
        </ScrollView>
        {/* <Footer/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingBottom: hp('10%'),
        paddingHorizontal: wp('2.5%'),
    },
    scrollViewContent: {
    paddingBottom: hp('10%'),
    minHeight: hp('100%'), // 예시: 최소 화면 높이만큼 스크롤 영역 확보
    },

    // header: {
    //     width: wp('100%'),
    //     height: hp('8%'),
    //     position: 'absolute',
    //     top: 0,
    //     backgroundColor: '#ffffff',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: wp('4%'),
    // },
    // backArrow: {
    //  fontSize: hp('3%'),
    //  marginRight: wp('2%'),
    // },
    // rewardTitle: {
    //  color: '#000000',
    //  textAlign: 'center',
    //  fontFamily: 'Inter-Regular',
    //  fontSize: hp('2.5%'),
    //  fontWeight: 'bold',
    //  flex: 1,
    // },
    pointIcon: {
        width: wp('30%'),
        height: hp('14%'),
        marginTop: hp('3%'),
        marginLeft: wp('30%'),
        //position : 'absolute'
    },
    currentPointsText: {
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: hp('3%'),
        fontWeight: 'bold',
        opacity: 0.5,
        marginTop: hp('2%'),
        marginLeft: wp('5%'),
       // position : 'absolute'
    },
    totalPoints: {
        color: 'rgba(147, 235, 24, 0.51)',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: hp('5%'),
        fontWeight: '400',
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
       // position : 'absolute'
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: hp('3%'),
        marginLeft: wp('10%'),
        marginBottom : hp('3%')
       // position: 'absolute',
    },
    pointDonationButton: {
        backgroundColor: 'rgba(147, 235, 24, 0.51)',
        borderRadius: 13,
        width: wp('25%'),
        height: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('2%'),
    },
    pointDonationText: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.8%'),
        fontWeight: '400',
    },
    tabButton: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
    },
    tabText: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.8%'),
        fontWeight: '400',
    },

    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#bcbcbc',
        width: wp('88%'),
        //height: hp('20%'),
        height : 'auto',
        minHeight: 100,
        //position: 'absolute',
        left: wp('6%'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        marginBottom: hp('1%'),
        marginLeft: wp('-3%'),
    },
    itemImage: {
        width: wp('14%'),
        height: hp('7%'),
        marginRight: wp('4%'),
        resizeMode: 'cover',
    },
    itemTitle: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.3%'),
        fontWeight: '400',
        flex: 1,
    },
    itemPoints: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2%'),
        fontWeight: '400',
        marginLeft: 'auto',
    },
    bottomBar: {
        backgroundColor: '#ffffff',
        width: wp('100%'),
        height: hp('8%'),
        position: 'absolute',
        bottom: 0,
        marginTop : '10%'
    },
});

export default RewardList;