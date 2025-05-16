import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocalBoardMain from '../screens/localBoard/LocalBoardMain';
import LocalBoardDetail from '../screens/localBoard/LocalBoardDetail';
import WriteLocalPost from '../screens/localBoard/WriteLocalPost';

export type LocalBoardStackParamList = {
    LocalBoardMain :  undefined;
    LocalBoardDetail : { id: number };
    WriteLocalPost: undefined;
}

const Stack = createNativeStackNavigator<LocalBoardStackParamList>();

export default function LocalBoardNavigator() {
    return(
        <Stack.Navigator initialRouteName="LocalBoardMain">
            <Stack.Screen name="LocalBoardMain" component={LocalBoardMain} options={{ title: '우리 동네 게시판', headerShadowVisible: false}}/>
            <Stack.Screen name="LocalBoardDetail" component={LocalBoardDetail} options={{ title: '', headerShadowVisible: false}}/>
            <Stack.Screen name="WriteLocalPost" component={WriteLocalPost} options={{ title: '', headerShadowVisible: false }}/>
        </Stack.Navigator>
    );
}