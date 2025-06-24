import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import ChatingDetail from "../screens/chat/ChatingDetail";
import ChatingList from "../screens/chat/ChatList";
import { Text, TouchableOpacity } from "react-native";

export type ChatStackParamList = {
    ChatingDetail: { chatRoomId: number, sharingPostId:number, sellerId : number };
    ChatingList: undefined;
}

const Stack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatNavigator(){
    return(
        <Stack.Navigator>
            {/* 채팅방 */}
            <Stack.Screen 
            name="ChatingDetail" 
            component={ChatingDetail}
            />
            
            {/* 채팅목록 */}
            {/* <Stack.Screen name="ChatingList" 
            component={ChatingList} 
            /> */}

            {/* <Stack.Screen
                name="ChatingList"
                component={ChatList}
                options={({ navigation }) => ({
                title: '채팅',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 18, marginRight: 10 }}>나가기</Text>
                </TouchableOpacity>
                )
                })}
            /> 도훈이 chatList UI */}  

        </Stack.Navigator>
    );
}