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
        <Stack.Navigator>
            <Stack.Screen name="LocalBoardMain" component={LocalBoardMain} />
            <Stack.Screen name="LocalBoardDetail" component={LocalBoardDetail}/>
            <Stack.Screen name="WriteLocalPost" component={WriteLocalPost}/>
        </Stack.Navigator>
    );
}