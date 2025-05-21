import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VolunteerMain from "../screens/volunteer/VolunteerMain";
import VolunteerDetail from "../screens/volunteer/VolunteerDetail";

export type VolunteerStackParamList = {
    VolunteerMain : undefined;
    VolunteerDetail : {id : number};
}

const Stack = createNativeStackNavigator<VolunteerStackParamList>();

export default function volunteerNavigator() {
    return(
        <Stack.Navigator initialRouteName="VolunteerMain">
            <Stack.Screen name = "VolunteerMain" component={VolunteerMain} options={{ title: '봉사' , headerShadowVisible: false}}></Stack.Screen>
            <Stack.Screen name = "VolunteerDetail" component={VolunteerDetail} options={{ title: '' , headerShadowVisible: false}}></Stack.Screen>
        </Stack.Navigator>
    );
}