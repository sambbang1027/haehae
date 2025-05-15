//StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/community/CommunityScreen';
import LocalBoardMain from '../screens/localBoard/LocalBoardMain';
import VolunteerMain from '../screens/volunteer/VolunteerMain';
import SharingMain from '../screens/sharing/SharingMain';
import LocalBoardDetail from '../screens/localBoard/LocalBoardDetail';
import VolunteerDetail from '../screens/volunteer/VolunteerDetail';
import SharingDetail from '../screens/sharing/SharingDetail';

export type CommuntiyStackParamList = {
    Community: undefined;
    LocalBoardMain: undefined;
    VolunteerMain: undefined;
    SharingMain: undefined;
    LocalBoardDetail:  {id : number};
    VolunteerDetail: {id : number};
    SharingDetail: {id : number};
};


const Stack = createNativeStackNavigator<CommuntiyStackParamList>();

export default function CommunityNavigator() {
  return (
    <Stack.Navigator initialRouteName="Community">
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="LocalBoardMain" component={LocalBoardMain}/>
        <Stack.Screen name="VolunteerMain" component={VolunteerMain}/>
        <Stack.Screen name="SharingMain" component={SharingMain}/>
        <Stack.Screen name="LocalBoardDetail" component={LocalBoardDetail}/>
        <Stack.Screen name="VolunteerDetail" component={VolunteerDetail}/>
        <Stack.Screen name="SharingDetail" component={SharingDetail}/>
    </Stack.Navigator>
  );
}
