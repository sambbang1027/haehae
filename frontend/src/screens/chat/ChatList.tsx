import React, { useState, useRef, useLayoutEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput, 
    Keyboard,
    Pressable 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native';

const ChatList = () => {
    const navigation = useNavigation();
    const searchInputRef = useRef(null);
    const [searchText, setSearchText] = useState('');

    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // 선택된 채팅 ID

    const handleFocusTextInput = () => {
        console.log('검색바 터치됨!');
    };

    // 스와이프 삭제 버튼 핸들러 (개별 항목 삭제)
    const handleSwipeDeleteButtonPress = (rowKey: string) => {
        console.log(`슬라이프 삭제 버튼 클릭됨: ${rowKey}`);
        setChatItems(prevItems => prevItems.filter(item => String(item.id) !== rowKey));
    };

    const [chatItems, setChatItems] = useState([
        {
            id: 1,
            profileImage: require('../../assets/images/chat-profile.png'),
            userName: '서샘이',
            lastMessage: '중고 세탁기 나눔합니다.',
            time: '2시간 전',
            unreadCount: 2,
        },
        {
            id: 2,
            profileImage: require('../../assets/images/chat-profile.png'),
            userName: '군포의 왕 태현',
            lastMessage: '아이패드 에어 무료 나눔',
            time: '4시간 전',
        },
        {
            id: 3,
            profileImage: require('../../assets/images/chat-profile.png'),
            userName: '킹도훈',
            lastMessage: '취업하게 해주세요.',
            time: '5일 전',
        },
        {
            id: 4,
            profileImage: require('../../assets/images/chat-profile.png'),
            userName: '도레미 재헌',
            lastMessage: '전재산 무료나눔',
            time: '3달 전',
        },
    ]);

    // 헤더의 삭제/취소 버튼 핸들러
    const handleHeaderDelete = () => {
        if (isDeleteMode) { // 현재 삭제 모드일 때 (취소 또는 선택 삭제)
            if (selectedIds.length > 0) {
                // 선택된 항목이 있다면 해당 항목들을 삭제
                setChatItems(prevItems => prevItems.filter(item => !selectedIds.includes(item.id)));
                setSelectedIds([]); // 선택 초기화
            }
            setIsDeleteMode(false); // 삭제 모드 종료 (취소)
        } else { // 현재 삭제 모드가 아닐 때 (삭제 모드 진입)
            setIsDeleteMode(true); // 삭제 모드 시작
            setSelectedIds([]); // 모드 진입 시 선택 초기화
        }
    };

    // navigation 옵션에 삭제/취소 함수 등록
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={handleHeaderDelete}
                >
                    <Text style={{ fontSize: 18, marginRight: 10 }}>
                        {isDeleteMode ? (selectedIds.length > 0 ? `삭제 (${selectedIds.length})` : '취소') : '삭제'}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, isDeleteMode, selectedIds]); // selectedIds를 의존성 배열에 추가하여 개수에 따라 텍스트 업데이트

    // 체크박스 토글 함수
    const toggleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // 채팅 아이템 렌더링 함수
    const renderChatItems = ({ item }: { item: { id: number; profileImage: any; userName: string; lastMessage: string; time: string; unreadCount?: number } }) => (
        <Pressable 
            style={styles.chatItem} 
            onPress={() => {
                if (isDeleteMode) { // 삭제 모드일 때는 체크박스 토글
                    toggleSelect(item.id);
                } else { // 일반 모드일 때는 채팅방으로 이동
                    console.log('채팅 아이템 터치됨! ID:', item.id);
                    // navigation.navigate('ChatRoom', { chatId: item.id, userName: item.userName }); // 예시: 채팅방으로 이동
                }
            }}
        >
            {isDeleteMode && ( // 삭제 모드일 때만 체크박스 렌더링
                <TouchableOpacity onPress={() => toggleSelect(item.id)} style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, selectedIds.includes(item.id) && styles.checkboxSelected]}>
                        {selectedIds.includes(item.id) && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>
                </TouchableOpacity>
            )}
            <Image
                source={item.profileImage}
                style={styles.profileImage}
            />
            <View style={styles.chatDetails}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
            {item.unreadCount && (
                <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                </View>
            )}
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TouchableOpacity 
                    style={styles.searchBar} 
                    onPress={handleFocusTextInput}
                    activeOpacity={1} 
                >
                    <TextInput
                        ref={searchInputRef}
                        style={styles.searchText}
                        placeholder="검색어를 입력하세요."
                        placeholderTextColor="#717171"
                        onChangeText={setSearchText}
                        value={searchText}
                        returnKeyType="search"
                        onSubmitEditing={() => {
                            console.log('검색어:', searchText);
                            Keyboard.dismiss();
                        }}
                    />
                    <TouchableOpacity onPress={handleFocusTextInput}>
                        <Image
                            source={require('../../assets/icons/search-icon.png')}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <SwipeListView
                data={chatItems}
                renderItem={renderChatItems}
                renderHiddenItem={({ item }) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            onPress={() => handleSwipeDeleteButtonPress(String(item.id))}
                        >
                            <Text style={styles.backTextWhite}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-wp('20%')}
                disableRightSwipe={true}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={styles.scrollViewContent}
                // 삭제 모드일 때는 스와이프 기능을 비활성화
                //disableRowSwipe={isDeleteMode} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1,
    },
    searchBarContainer: {
        position: 'absolute',
        top: hp('3%'),
        width: wp('100%'),
        alignItems: 'center',
        zIndex: 1, // Ensure search bar is on top
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        width: wp('95%'),
        height: hp('6%'),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5%'),
        shadowColor: 'rgba(176, 176, 176, 0.25)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    searchText: {
        color: '#717171',
        fontFamily: 'Inter-Regular',
        fontSize: wp('3.5%'),
        fontWeight: '400',
        flex: 1,
    },
    searchIcon: {
        width: wp('7.5%'),
        height: wp('7.5%'),
    },
    scrollViewContent: {
        paddingTop: hp('10%'), // Adjust based on header and search bar height
        paddingBottom: hp('2%'),
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('5%'),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        backgroundColor: '#FCFCFC', 
        height: wp('20%') + hp('4%'),
    },
    profileImage: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('10%'), // Makes it circular
        marginRight: wp('5%'),
    },
    chatDetails: {
        flex: 1,
    },
    userName: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: wp('4%'),
        fontWeight: '400',
    },
    lastMessage: {
        color: '#000000',
        fontFamily: 'Inter-SemiBold',
        fontSize: wp('3.2%'),
        fontWeight: '600',
        marginTop: hp('0.5%'),
    },
    time: {
        color: '#000000',
        fontFamily: 'Inter-Regular',
        fontSize: wp('2.5%'),
        fontWeight: '400',
    },
    unreadBadge: {
        backgroundColor: 'rgba(147, 235, 24, 0.51)',
        borderRadius: 10,
        width: wp('5%'),
        height: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('2%'),
    },
    unreadCount: {
        color: '#000000',
        fontFamily: 'Inter-SemiBold',
        fontSize: wp('2.5%'),
        fontWeight: '600',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD', // 슬라이드 시 보이는 배경색
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: 15,
        height: wp('20%') + hp('4%'),
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: wp('20%'), // rightOpenValue와 동일하게 설정
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    checkboxContainer: {
        width: wp('8%'), // 체크박스 영역 크기
        height: wp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp('3%'), // 프로필 이미지와의 간격
    },
    checkbox: {
        width: wp('6%'),
        height: wp('6%'),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#717171',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#93EB18', // 체크되었을 때 배경색
        borderColor: '#93EB18',
    },
    checkmark: {
        color: '#FFFFFF', // 체크 표시 색상
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
});

export default ChatList;