import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocalBoardStackParamList } from "./LocalBoardNavigator";
import LocalBoardReply from "../screens/localBoard/LocalBoardReply";

export type LocalBoardReplyStackParamList = {
    LocalBoardReply: { commentId: number };
}

const Stack = createNativeStackNavigator<LocalBoardReplyStackParamList>();

export default function LocalBoardReplyNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="LocalBoardReply" component={LocalBoardReply}/>
        </Stack.Navigator>
    );
}