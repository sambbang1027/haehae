import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Swipeable } from 'react-native-gesture-handler'; // Swipeable import

function Alarm() {
    const [notifications, setNotifications] = useState([]);


    const renderRightActions = () => (
        <TouchableOpacity style={styles.leftAction} onPress={() => console.log('삭제')}>
            <Text style={styles.actionText}>삭제</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.notificationArea}>
                    <Text style={styles.userName}>킹도훈님</Text>
                    <View style={styles.textArea}>
                        <Text style={styles.description}>
                            현재 거주중인 주소지의
                        </Text>
                        <Text style={styles.description}>
                            분리수거 및 클래스 알림 목록이에요.
                        </Text>
                    </View>
                </View>

                {/* 하드 코딩된 알림 1 */}
                <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.alarmItem}>
                        <Image style={styles.profileImage} source={require('../assets/image7.png')} alt="ellipse" />
                        <Text style={styles.alarmText}>
                            수요일은 플라스틱을 수거하는 날이에요. 오늘도 열심히 재활용을 해봐요!
                        </Text>
                        <Text style={styles.timeAgo}>4시간전</Text>
                    </View>
                </Swipeable>

                {/* 하드 코딩된 알림 2 */}
                <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.alarmItem}>
                        <Image style={styles.profileImageSecondary} source={require('../assets/image7.png')} alt="ellipse" />
                        <Text style={styles.alarmText}>
                            오늘은 지구의 날이에요. 오늘 하루도 지구를 구해봅시다!
                        </Text>
                        <Text style={styles.timeAgoShort}>1일전</Text>
                        {/* <Text style={styles.timeAgoSecondary}>3일전</Text> */}
                    </View>
                </Swipeable>

                {/* 하드 코딩된 알림 3 (메시지 형태) */}
            <Swipeable renderRightActions={renderRightActions}>
                    <View style={styles.alarmItem}>
                        <Image
                            style={styles.userProfileIcon}
                            source={require('../assets/image7.png')}
                            alt="user profile"
                        />
                        <Text style={styles.alarmText}>xxx님으로부터 나눔 거래 메세지가 도착했어요.</Text>
                        <Text style={styles.timeAgoShort}>1일전</Text>
                    </View>
                </Swipeable>

                {/* Axios 요청으로 가져온 알림 목록 */}  
                {/* {notifications.map(notification => (
                    <Swipeable key={notification.id} renderRightActions={renderRightActions}>
                        <View style={styles.alarmItem}>
                            {notification.type === 'message' ? (
                                <>
                                    <Image
                                        style={styles.userProfileIcon}
                                        source={{ uri: notification.senderProfileImage }}
                                        alt="user profile"
                                    />
                                    <Text style={styles.alarmText}>{notification.message}</Text>
                                    <Text style={styles.timeAgoShort}>{notification.createdAt}</Text>
                                </>
                            ) : (
                                <>
                                    <Image style={styles.profileImageSecondary} source={{ uri: notification.profileImage }} alt="profile" />
                                    <Text style={styles.alarmText}>{notification.content}</Text>
                                    <Text style={styles.timeAgo}>{notification.timeAgo}</Text>
                                </>
                            )}
                        </View>
                    </Swipeable> 
                ))}
                */}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        width: wp('100%'),
        paddingBottom: hp('2%'),
        alignItems: 'center',
    },
    notificationArea: {
        backgroundColor: '#ffffff',
        borderRadius: 21,
        borderStyle: 'solid',
        borderColor: 'rgba(147, 235, 24, 0.51)',
        borderWidth: 1,
        width: wp('88%'),
        height: hp('14%'),
        marginTop: hp('3%'),
    },
    userName: {
        color: '#000000',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        marginTop: hp('1.8%'),
    },
    textArea: {
        marginTop: hp('1%'),
    },
    description: {
        color: '#808080',
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: hp('2%'),
        fontWeight: '400',
        marginLeft: wp('6%'),
        width: wp('80%'),
    },
    alarmItem: {
        width: wp('88%'),
        paddingVertical: hp('1%'),
        marginTop:hp('1%'),
        marginBottom: hp('1%'),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white', // 스와이프 시 배경색
    },
    alarmText: {
        color: '#000000',
        textAlign: 'left',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.9%'),
        fontWeight: '400',
        marginLeft: wp('5%'),
        width: wp('55%'),
    },
    timeAgo: {
        color: '#6d6d6d',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.5%'),
        fontWeight: '400',
        marginLeft: 'auto',
    },
    profileImage: {
        width: wp('10%'),
        height: hp('5%'),
    },
    notificationIcon: {
        borderRadius: wp('10%') / 2,
        width: wp('9%'),
        height: hp('4.5%'),
        marginLeft: wp('2%'),
    },
    profileImageSecondary: {
        width: wp('10%'),
        height: hp('5%'),
    },
    timeAgoSecondary: {
        color: '#6d6d6d',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.5%'),
        fontWeight: '400',
        marginLeft: 'auto',
    },
    timeAgoLong: {
        color: '#6d6d6d',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.5%'),
        fontWeight: '400',
        marginLeft: 'auto',
    },
    timeAgoShort: {
        color: '#6d6d6d',
        textAlign: 'right',
        fontFamily: 'Inter-Regular',
        fontSize: hp('1.5%'),
        fontWeight: '400',
        marginLeft: 'auto',
    },
    userProfileIcon: {
        width: wp('10%'),
        height: hp('5%'),
    },
    leftAction: {
        backgroundColor: '#ff5f4a',
        justifyContent: 'center',
        marginTop:hp('0.5%'),
        width: wp('18%'),
        height : hp('10%')
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: wp('5%'),
    },
});

export default Alarm;