import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SharingMain from "../screens/sharing/SharingMain";
import SharingDetail from "../screens/sharing/SharingDetail";
import WriteSharingPost from "../screens/sharing/WriteSharingPost";

export type SharingParamList  = {
    SharingMain : undefined;
    SharingDetail : { id:number };
    WriteSharingPost : undefined;
}

const Stack = createNativeStackNavigator<SharingParamList>();

export default function SharingNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="SharingMain" component={SharingMain}></Stack.Screen>
            <Stack.Screen name="SharingDetail" component={SharingDetail}></Stack.Screen>
            <Stack.Screen name="WriteSharingPost" component={WriteSharingPost}></Stack.Screen>
        </Stack.Navigator>
    );
}