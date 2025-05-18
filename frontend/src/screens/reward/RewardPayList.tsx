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
import Header from '../../components/MainHeader';
import Footer from '../../components/Footer';

const RewardPayList = () => {
    const navigation = useNavigation();

    const rewardItems = [
        { id: 1, title: '인천시 나무심기 기부', points: '1,000p', imageSrc: require('../../assets/tree.png'), paymentDate: '2025.04.28 17시 59분' },
        { id: 2, title: '산불 피해 이웃 돕기', points: '1,000p', imageSrc: require('../../assets/chimchack.png'), paymentDate: '2025.04.28 17시 59분' },
        { id: 3, title: '불우이웃 재헌이 돕기', points: '1,000p', imageSrc: require('../../assets/faker.png'), paymentDate: '2025.04.28 17시 59분' },
        { id: 4, title: '불우이웃 도훈이 돕기', points: '100,000p', imageSrc: require('../../assets/iu.png'), paymentDate: '2025.04.28 17시 59분' },
    ];

    return (
        <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>


            {rewardItems.map((item, index) => (
            <View key={item.id} style={styles.paymentItem}>
                <Image source={item.imageSrc} style={styles.itemImage} resizeMode="cover" />
                <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.pointInfo}>
                    <Text style={styles.pointAmount}>{item.points}</Text>
                </View>
                <Text style={styles.paymentDate}>{item.paymentDate}</Text>
                </View>
            </View>
            ))}
            {rewardItems.map((_, index) => (
            index < rewardItems.length - 1 && <View key={`separator-${index}`} style={styles.separator} />
            ))}
        </ScrollView>
        <Footer />
        </View>
    );
    };

    const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        paddingBottom: hp('2%'),
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('4%'),
    },
    backIcon: {
        width: wp('6.4%'),
        height: hp('2.3%'),
        transform: [{ scaleX: -1 }],
        marginRight: wp('3%'),
    },
    listTitle: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: wp('6%'),
        fontWeight: '400',
    },
    // separator: {
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#bcbcbc',
    //     marginHorizontal: wp('8%'),
    //     height: 1, // Adjust height as needed for the line
    // },
    paymentItem: {
        flexDirection: 'row',
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('1.5%'), // Added some vertical padding for spacing
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#bcbcbc',
         marginHorizontal: wp('2%')
    },
    itemImage: {
        width: wp('14.1%'),
        height: hp('7.8%'),
        borderRadius: wp('1%'),
        marginRight: wp('3%'),
    },
    itemDetails: {
        flex: 1,
        paddingVertical: hp('1%'),
    },
    itemTitle: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: wp('4.8%'),
        fontWeight: '400',
    },
    pointInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('0.3%'),
    },
    pointAmount: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: wp('4.3%'),
        fontWeight: '400',
        marginRight: wp('1%'),
    },
    pointIcon: {
        width: wp('4.3%'), // Adjust based on your icon size
        height: wp('4.3%'),
    },
    paymentDate: {
        color: '#d8d4d4',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: wp('3.8%'),
        fontWeight: '400',
        marginTop: hp('0.3%'),
    },
});

export default RewardPayList;