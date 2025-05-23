import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import SharingMain from "../screens/sharing/SharingMain";
import SharingDetail from "../screens/sharing/SharingDetail";
import WriteSharingPost from "../screens/sharing/WriteSharingPost";
import ChatNavigator, { ChatStackParamList } from "./ChatNavigator";

export type SharingStackParamList  = {
    SharingMain : undefined;
    SharingDetail : { id:number };
    WriteSharingPost : undefined;
    ChatingStack: NavigatorScreenParams<ChatStackParamList>;
}

const Stack = createNativeStackNavigator<SharingStackParamList>();

export default function SharingNavigator() {
    return(
        <Stack.Navigator initialRouteName="SharingMain">
            <Stack.Screen name="SharingMain" component={SharingMain} options={{ title: '나눔' }}></Stack.Screen>
            <Stack.Screen name="SharingDetail" component={SharingDetail} options={{ title: '', headerShadowVisible: false }}></Stack.Screen>
            <Stack.Screen name="WriteSharingPost" component={WriteSharingPost} options={{ title: '', headerShadowVisible: false }}></Stack.Screen>
            <Stack.Screen name="ChatingStack" component={ChatNavigator} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}