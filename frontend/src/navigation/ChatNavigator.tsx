import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import ChatingDetail from "../screens/chat/ChatingDetail";
import ChatingList from "../screens/chat/ChatingList";
import Header from "../components/MainHeader";
import { Text, TouchableOpacity } from "react-native";

export type ChatStackParamList = {
    ChatingDetail: undefined;
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
            <Stack.Screen name="ChatingList" 
            component={ChatingList} 
            />

        </Stack.Navigator>
    );
}