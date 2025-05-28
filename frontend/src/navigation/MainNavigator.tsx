import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "../screens/main/MainScreen";
import Mission from "../screens/mission/MissionScreen";
import Alarm from "../screens/alarm/Alarm";
import Reward from "./RewardNavigator";


export type MainStackParamList = {
    Main : undefined;
    Mission : undefined;
    Alarm : undefined;
    Reward : undefined;
}

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
    return (
        <Stack.Navigator 
        initialRouteName="Main">
            <Stack.Screen
            name="Main"
            component={Main}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Mission"
            component={Mission}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Alarm"
            component={Alarm}
            options={{ headerTitle: "알람 목록" }}
            />
            <Stack.Screen
            name="Reward"
            component={Reward}
            options = {{headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;