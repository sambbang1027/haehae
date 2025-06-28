import React, { useState , useEffect} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '../../navigation/NavigationService';
// pagination hooks
import usePagination from '../../hooks/UsePagination';


const RewardList = () => {
    const [selectedType, setSelectedType] = useState<string>('DONATION');

    const handleRewardPress = async (type : string) => {
            setSelectedType(type); 
            console.log(selectedType);
    };

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


    const {
        items: rewardItems, fetchNextPage, hasNextPage,isFetchingNextPage, isLoading,} = usePagination<RewardItem>({
        path: `/reward/list/${selectedType}`,
        limit: 2,
    });
    console.log(rewardItems);
    
    const renderHeader = () => (
        <View style={styles.container}>
        <Image
            style={styles.pointIcon}
            source={require('../../assets/images/reward-coin.png')}
            resizeMode="contain"
        />
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
        </View>
    );

    return (
        <FlatList
        data={rewardItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemClick(item.id)} style={styles.listItem}>
            <Image style={styles.itemImage} source={{ uri: item.rewardItemsImgUrl?.[0] }} />
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemPoints}>{item.pointCost}P</Text>
            </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="small" color="#000" /> : null}
        onEndReached={() => {
            if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.2}
        contentContainerStyle={[styles.scrollViewContent, { flexGrow: 1 }]}
        />
        );
    };


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        paddingBottom: hp('2%'),
        paddingHorizontal: wp('2.5%'),
    },
    scrollViewContent: {
        paddingBottom: hp('10%'),
        minHeight: hp('100%'), 
        backgroundColor : '#ffffff'
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