import React, { useState , useEffect} from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RewardParamList } from '../../navigation/RewardNavigator';
import api from '../../api/AxiosInstance';
import { navigate } from '../../navigation/NavigationService';

type RewardScreenNavigationProp = NativeStackNavigationProp<RewardParamList,'RewardList'>;

const RewardList = () => {
    const [selectedType, setSelectedType] = useState<string>('DONATION');
    useEffect(() => {
        handleRewardPress("DONATION"); 
    }, []);

    const handleItemClick = (id :number) => {
        navigate('RewardStack', {
        screen: 'RewardDetail',
        params: { rewardId: id }
        });
    };

    type RewardItem = {
        id: number ;
        name: string;
        pointCost: number;
        rewardItemsImgUrl: string[] | null;
    };

    const [rewardItems, setRewardItems] = useState<RewardItem[] | null>(null);

    const handleRewardPress = async (type : string) => {
        try {
            setSelectedType(type);
            const response = await api.get(`/reward/list/${type}`);
            console.log("리워드 응답:", response.data);
            setRewardItems(response.data);
            
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };
    
    return (
        <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}
        contentContainerStyle={styles.scrollViewContent}>
            {/* <Header /> */}
            <Image style={styles.pointIcon} source={require('../../assets/images/reward-coin.png')} resizeMode="contain" />
            <Text style={styles.currentPointsText}>현재 킹도훈님의 포인트</Text>
            <Text style={styles.totalPoints}>1,080P</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity    
                    style={[
                        styles.tabButton,
                        selectedType === 'DONATION' && styles.selectedTabButton
                        ]} 
                    onPress={() => handleRewardPress('DONATION')}>
                    <Text style={styles.tabText}>포인트 기부</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.tabButton,
                        selectedType === 'VOUCHER' && styles.selectedTabButton
                        ]}  
                    onPress={() => handleRewardPress("VOUCHER")}>
                    <Text style={styles.tabText}>상품권</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.tabButton,
                        selectedType === 'GIFTICON' && styles.selectedTabButton
                        ]}   
                    onPress={() => handleRewardPress("GIFTICON")}>
                    <Text style={styles.tabText}>쿠폰/기프티콘</Text>
                </TouchableOpacity>
            </View>
            {rewardItems?.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[styles.listItem]}
                    onPress={() => handleItemClick(item.id)}
                >
                    <Image style={styles.itemImage} source={{uri : item.rewardItemsImgUrl?.[0]}} />
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemPoints}>{item.pointCost}P</Text>
                </TouchableOpacity>
            ))}
    
        </ScrollView>
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
    minHeight: hp('100%'), 
    },
    pointIcon: {
        width: wp('30%'),
        height: hp('14%'),
        marginTop: hp('3%'),
        marginLeft: wp('30%'),
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
    },
    totalPoints: {
        color: 'rgba(147, 235, 24, 0.51)',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: hp('5%'),
        fontWeight: '400',
        marginTop: hp('1%'),
        marginLeft: wp('5%'),
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: hp('3%'),
        marginLeft: wp('10%'),
        marginBottom : hp('3%')
    },
    tabButton: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
        backgroundColor: 'white',
    },
    selectedTabButton: {
        backgroundColor: 'rgba(147, 235, 24, 0.51)',
        borderRadius: 13,
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.8%'),
        fontWeight: '400',
    },
    selectedTabText: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.8%'),
        fontWeight: 'bold',
    },


    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#bcbcbc',
        width: wp('88%'),
        height : 'auto',
        minHeight: 100,
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
        fontSize: hp('2%'),
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