import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from "../screens/main/MainScreen";
import Mission from "../screens/mission/MissionScreen";
import Alarm from "../screens/alarm/Alarm";
import Reward from "./RewardNavigator";
import Location from "./LocationNavigator";
import Waste from "./WasteNavigator";
import Point from "../screens/mypage/PointRecordPage";
import Community from "./CommunityNavigator";
import Recycle from "../screens/calendar/RecycleCalendarScreen";

import { NavigatorScreenParams } from "@react-navigation/native";
import { RewardParamList } from "./RewardNavigator";
import { LocationStackParamList } from "./LocationNavigator";
import { WasteStackParamList } from "./WasteNavigator";
import { CommunityStackParamList } from "./CommunityNavigator";




export type MainStackParamList = {
    Main : undefined;
    Mission : undefined;
    Alarm : undefined;
    Reward: NavigatorScreenParams<RewardParamList>;
    Location : NavigatorScreenParams<LocationStackParamList>;
    Waste : NavigatorScreenParams<WasteStackParamList>;
    Point : undefined;
    Community : NavigatorScreenParams<CommunityStackParamList>;
    Recycle: undefined;
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
            options = {{headerTitle: '미션 목록' }}
            />
            <Stack.Screen
            name="Alarm"
            component={Alarm}
            options={{ headerTitle: '알람 목록' }}
            />
            <Stack.Screen
            name="Reward"
            component={Reward}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Location"
            component={Location}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Waste"
            component={Waste}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Point"
            component={Point}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Community"
            component={Community}
            options = {{headerShown: false }}
            />
            <Stack.Screen
            name="Recycle"
            component={Recycle}
            options = {{headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;