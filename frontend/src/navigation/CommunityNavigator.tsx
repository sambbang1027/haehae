//StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import CommunityScreen from '../screens/community/CommunityScreen';
import { LocalBoardStackParamList } from './LocalBoardNavigator';
import { VolunteerStackParamList } from './VolunteerNavigator';
import { SharingStackParamList } from './SharingNavigator';
import LocalBoardMain from '../screens/localBoard/LocalBoardMain';
import VolunteerMain from '../screens/volunteer/VolunteerMain';
import SharingMain from '../screens/sharing/SharingMain';
import LocalBoardDetail from '../screens/localBoard/LocalBoardDetail';
import VolunteerDetail from '../screens/volunteer/VolunteerDetail';
import SharingDetail from '../screens/sharing/SharingDetail';
import LocalBoardNavigator from './LocalBoardNavigator';
import VolunteerNavigator from './VolunteerNavigator';
import SharingNavigator from './SharingNavigator';

export type CommuntiyStackParamList = {
    Community: undefined;
    // LocalBoardMain: undefined;
    // VolunteerMain: undefined;
    // SharingMain: undefined;
    LocalBoardDetail:  {id : number};
    VolunteerDetail: {id : number};
    SharingDetail: {id : number};
    LocalBoardStack: NavigatorScreenParams<LocalBoardStackParamList>;
    VolunteerStack: NavigatorScreenParams<VolunteerStackParamList>;
    SharingStack: NavigatorScreenParams<SharingStackParamList>;
};


const Stack = createNativeStackNavigator<CommuntiyStackParamList>();

export default function CommunityNavigator() {
  return (
    <Stack.Navigator initialRouteName="Community">
        <Stack.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="LocalBoardDetail" component={LocalBoardDetail} options={{ title: '', headerShadowVisible: false }}/>
        <Stack.Screen name="VolunteerDetail" component={VolunteerDetail} options={{ title: '', headerShadowVisible: false }}/>
        <Stack.Screen name="SharingDetail" component={SharingDetail} options={{ title: '', headerShadowVisible: false }}/> 
        <Stack.Screen name="LocalBoardStack" component={LocalBoardNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="SharingStack" component={SharingNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="VolunteerStack" component={VolunteerNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
