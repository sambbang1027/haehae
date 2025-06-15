import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RewardParamList } from '../../navigation/RewardNavigator';
import api from '../../api/AxiosInstance';
import { Timestamp } from 'react-native-reanimated/lib/typescript/commonTypes';
import { formatTOKSTDateTime } from "../../utils/TimeStampToConvert";

type RewardScreenNavigationProp = RouteProp<RewardParamList,'RewardDetail'>;


const RewardDetail = () => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [usePoints, setUsePoints] = useState('');
    const route = useRoute<RewardScreenNavigationProp>(); 
    const { rewardId } = route.params;
    console.log(rewardId);


    useEffect(() => {
        rewardDetailInfo(rewardId);
    }, [rewardId]);

    const [rewardDetailItem, setrewardDetailItem]= useState<{
        id : number;
        name : string;
        description : string;
        pointCost : number;
        organization : string;
        createdAt : string;
        updatedAt : string | null;
        rewardImageId : number[];
        rewardItemsImgUrl : string[];
    } | null>(null)



    const rewardDetailInfo = async(rewardId : number)=>{
        try{
            const response = await api.get(`reward/detail/${rewardId}`);
            console.log(response.data);
            const convertDate = formatTOKSTDateTime(response.data.createdAt);
            const convertUpdateDate = formatTOKSTDateTime(response.data.updatedAt);
            setrewardDetailItem({
                id : response.data.id,
                name : response.data.name,
                description : response.data.description,
                pointCost : response.data.pointCost,
                organization : response.data.ororganization,
                createdAt : convertDate,
                updatedAt : convertUpdateDate,
                rewardImageId : response.data.rewardImageId,
                rewardItemsImgUrl : response.data.rewardItemsImgUrl
            });

        }catch(error) {
            console.log(error);
        }
    }

    const handlerPayPress = () => {
        console.log('결제하기 버튼이 눌렸습니다.');
    };

    const handlePayButtonPress = () => {
        setIsBottomSheetVisible(true);
    };

    const closeBottomSheet = () => {
        setIsBottomSheetVisible(false);
        setUsePoints('');
    };

    const handlePaymentConfirmation = () => {
        console.log('결제 확인:', usePoints);
        closeBottomSheet();
        // navigation.navigate('RewardPay');
    };

    const availablePoints = 1080;
    const donationAmount = 1000;
    const remainingPoints = availablePoints - parseInt(usePoints || '0', 10);
    const finalPayment = Math.max(0, donationAmount - parseInt(usePoints || '0', 10));

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.mainContent}>
                    <Text style={styles.donationTitle}>{rewardDetailItem?.name}</Text>
                    <View style={styles.donationInfo}>
                        <Text style={styles.date}>
                            {rewardDetailItem?.updatedAt
                                ? rewardDetailItem.updatedAt
                                : rewardDetailItem?.createdAt}
                            </Text>
                        <Text style={styles.organization}>{rewardDetailItem?.organization}</Text>
                    </View>
                    {/* <Image style={styles.donationImage} source={require('../../assets/images/chimchak.png')} resizeMode="cover" /> */}
                        {rewardDetailItem?.rewardImageId && rewardDetailItem.rewardImageId.length > 0 && (
                            rewardDetailItem.rewardImageId.map((id, index) => (
                                <Image
                                    key={id}
                                    source={{ uri: rewardDetailItem.rewardItemsImgUrl[index] }}
                                    style={styles.donationImage}
                                />
                            ))
                        )}
                    <Text style={styles.donationDescription}>
                            {rewardDetailItem?.description}
                    </Text>
                    <View style={styles.paymentSummary}>
                        <View style={styles.paymentItem}>
                            <View style={styles.paymentHeader}>
                                <Image style={styles.paymentImage} source={require('../../assets/images/chimchak.png')} resizeMode="cover"/>
                                <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                                    <Text style={styles.paymentOrganization}>동서남북 기부단체</Text>
                                    <Text style={styles.paymentTitle}>불우이웃 재헌이 돕기</Text>
                                </View>
                            </View>
                            <View style={styles.deviceLine}></View>
                            <View style={styles.paymentAmountContainer}>
                                <Text style={styles.paymentLabel}>결제 금액</Text>
                                <Text style={styles.paymentAmount}>{donationAmount}p</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.availablePointsCard}>
                        <Text style={styles.availablePointsLabel}>현재 사용가능한 포인트</Text>
                        <Text style={styles.availablePoints}>{availablePoints}p</Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity onPress={handlePayButtonPress}>
                <View style={styles.bottomBackground}>
                    <Text style={styles.payText}>결 제 하 기</Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isBottomSheetVisible}
                onRequestClose={closeBottomSheet}
            >
                <View style={styles.bottomSheetOverlay}>
                    <View style={styles.bottomSheetContainer}>
                        <TouchableOpacity onPress={closeBottomSheet}>
                                <Image style={styles.slideDown} source={require('../../assets/icons/slide-down.png')} ></Image>
                        </TouchableOpacity>
                        <View style={styles.bottomsheetArea}>
                            <View style={styles.bottomSheetItem}>
                                <Text style={styles.bottomSheetLabel}>금액</Text>
                                <Text style={styles.bottomSheetValue}>{donationAmount}p</Text>
                            </View>

                            <View style={styles.bottomSheetItem}>
                                <Text style={styles.bottomSheetLabel}>사용할 포인트</Text>
                                <TextInput
                                    style={styles.pointInput}
                                    keyboardType="number-pad"
                                    value={usePoints}
                                    onChangeText={setUsePoints}
                                    placeholder="포인트 입력"
                                /> 
                                <Text style={styles.bottomSheetValue}>1,000p</Text>
                            </View>

                            <View style={styles.bottomSheetItem2}>
                                <Text style={styles.bottomSheetLabel2}>현재 보유 포인트</Text>
                                <Text style={styles.bottomSheetValue2}>1,080p</Text>
                            </View>

                            <View style={styles.bottomSheetItem3}>
                                <Text style={styles.bottomSheetLabel2}>결제 시 남을 포인트</Text>
                                <Text style={styles.bottomSheetValue2}>80p</Text>
                            </View>

                            <View style={styles.bottomSheetItem}>
                                <Text style={styles.bottomSheetLabel}>최종 결제 금액</Text>
                                <Text style={styles.bottomSheetValue3}>{finalPayment}p</Text>
                            </View>
                        </View> 
                        
                        <View style={styles.bottomSheetButtons}>
                                <TouchableOpacity style={styles.confirmButton} onPress={handlePaymentConfirmation}>
                                    <Text style={styles.buttonText}>결제하기</Text>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
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
        marginTop: hp('2%'),
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
        marginLeft: wp('5%'),
        fontWeight: '400',
    },
    organization: {
        color: '#000000',
        textAlign: 'right',
        fontSize: hp('1.7%'),
        marginRight: wp('5%'),
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
        borderBottomWidth : 2,
        borderColor: '#c4c4c4',
        paddingBottom : hp('2.5%')
    },
    paymentSummary: {
    marginBottom: hp('2%'),
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#d8d4d4',
    padding: hp('2%'),
    backgroundColor: 'white',
    },
    paymentItem: {
    flexDirection: 'column', // 세로 배치
    alignItems: 'flex-start', // 왼쪽 정렬
    paddingVertical: hp('1.5%'),
    },
    paymentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: hp('0.5%'),
    },
    paymentImage: {
        width: wp('20%'), // 이미지 크기 조정
        height: wp('20%'),
        aspectRatio: 1,
        marginRight: wp('3%'), // 이미지와 텍스트 간격
    },
    paymentOrganization: {
        color: '#888',
        fontSize: hp('1.8%'),
    },
    paymentTitle: {
        color: '#000',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        marginTop:hp('1%'),
        // marginLeft: wp('18%'), // 이미지 + 간격 만큼 들여쓰기 (제거)
        textAlign: 'left', // 텍스트를 왼쪽 정렬 (선택 사항)
    },
    deviceLine : {
        borderWidth : 1,
        width : wp('80%'),
        borderColor :'#d8d4d4',
        marginVertical: hp('2%'),
    },
    paymentAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 결제 금액과 금액을 양쪽 끝으로
    alignItems: 'center',
    marginTop: hp('1.5%'),
    },
    paymentLabel: {
    color: '#000',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    },
    paymentAmount: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
    marginLeft: wp('50%'),
    },
    availablePointsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderColor: '#d8d4d4',
        borderWidth: 1,
        padding: hp('2%'),
        marginBottom: hp('2.5%'),
        flexDirection: 'row',

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
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        marginLeft: wp('20%'),
    },
    bottomBackground: {
        backgroundColor: '#dafcac',
        left: 0,
        right: 0,
        bottom: 0,
        height: hp('12%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    payText: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
        color: 'white',
    },
    bottomSheetOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    bottomSheetContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: wp('5%'),
        borderBlockColor : '#d8d4d4',
    },
    // bottomSheetTitle: {
    //     fontSize: hp('3%'),
    //     fontWeight: 'bold',
    //     marginBottom: hp('2%'),
    //     textAlign: 'center',
    // },
    slideDown : {
        marginLeft : wp('40%'),
        marginBottom : hp('1%')
    },
    bottomsheetArea :{
        borderRadius : 35,
        borderWidth : 1,
        backgroundColor : 'white',
        padding: wp('5%'),
    },
    bottomSheetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
    },
    bottomSheetItem2 : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomSheetItem3 : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom :hp('3%'),
        borderBottomWidth : 1,
        paddingBottom : hp('3%')
    },
    bottomSheetLabel: {
        fontSize: hp('2.2%'),
        fontWeight: '500',
    },
    bottomSheetLabel2 : {
        fontSize: hp('1.5%'),
        color : '#d8d4d4',
    },
    bottomSheetValue: {
        fontSize: hp('2.2%'),
    },
    bottomSheetValue2: {
        fontSize: hp('1.5%'),
    },
    bottomSheetValue3:{
        fontSize: hp('2.2%'),
        fontWeight : 'bold'
    },
    pointInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        borderRadius: 8,
        },
    bottomSheetButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('3%'),
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
        padding: wp('3%'),
        borderRadius: 10,
        flex: 1,
        marginRight: wp('2%'),
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: '#dafcac',
        padding: wp('3%'),
        borderRadius: 10,
        flex: 1,
        marginLeft: wp('2%'),
        alignItems: 'center',
    },
    buttonText: {
        fontSize: hp('2.2%'),
        fontWeight: 'bold',
        color: 'black',
    },
});

export default RewardDetail;