import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VolunteerMain from "../screens/volunteer/VolunteerMain";
import VolunteerDetail from "../screens/volunteer/VolunteerDetail";

export type VolunteerParamList = {
    VolunteerMain : undefined;
    VolunteerDetail : {id : number};
}

const Stack = createNativeStackNavigator<VolunteerParamList>();

export default function volunteerNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name = "VolunteerMain" component={VolunteerMain}></Stack.Screen>
            <Stack.Screen name = "VolunteerDetail" component={VolunteerDetail}></Stack.Screen>
        </Stack.Navigator>
    );
}