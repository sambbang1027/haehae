//StackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/community/CommunityScreen';
import LocalBoardMain from '../screens/localBoard/LocalBoardMain';
import LocalBoardDetail from '../screens/localBoard/LocalBoardDetail';
import WriteLocalPost from '../screens/localBoard/WriteLocalPost';
import ShairingMain from '../screens/sharing/SharingMain';
import SharingDetail from '../screens/sharing/SharingDetail';
import VolunteerMain from '../screens/volunteer/VolunteerMain';
import VolunteerDetail from '../screens/volunteer/VolunteerDetail';
import WriteSharingPost from '../screens/sharing/WriteSharingPost';

import TestStack from './TestStack';           // 테스트 Stack

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Community">
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="LocalBoardMain" component={LocalBoardMain} />
        <Stack.Screen name="LocalBoardDetail" component={LocalBoardDetail} />
        <Stack.Screen name="WriteLocalPost" component={WriteLocalPost} />
        <Stack.Screen name="ShairingMain" component={ShairingMain} />
        <Stack.Screen name="VolunteerMain" component={VolunteerMain} />
        <Stack.Screen name="SharingDetail" component={SharingDetail}/>
        <Stack.Screen name="VolunteerDetail" component={VolunteerDetail}/>
        <Stack.Screen name="WriteSharingPost" component={WriteSharingPost}/>

        
        <Stack.Screen name="TestStack" component={TestStack} options={{ headerShown: false }} />
        
    </Stack.Navigator>
  );
}
