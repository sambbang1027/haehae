import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RewardList from "../screens/reward/RewardList";
import RewardDetail from "../screens/reward/RewardDetail";
import RewardPay from "../screens/reward/RewardPay";


export type RewardParamList = {
    RewardList : undefined;
    RewardDetail : { rewardId: number };
    RewardPay : {userPointId : number};
    Main : undefined;
    RewardPayList : {userPointId : number};
}

const Stack = createNativeStackNavigator<RewardParamList>();

const RewardNavigator = () => {
    return(
        <Stack.Navigator
        initialRouteName="RewardList">
            <Stack.Screen
            name="RewardList"
            component={RewardList}
            options= {{ headerTitle : '리워드 상점'}}
            />
            <Stack.Screen
            name="RewardDetail"
            component={RewardDetail}
            options={{ headerTitle: "리워드 상점" }}
            />
            <Stack.Screen
                name="RewardPay"
                component={RewardPay}
                options={({ navigation }) => ({ 
                headerTitle: "결제 완료",
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.getParent()?.navigate('MainStack', { screen: 'Main' })}>
                    <Text style={{ marginRight: wp('31.8%'),fontSize:wp('6%') }}>X</Text>
                    </TouchableOpacity>
                ),
                })}
            />
        </Stack.Navigator>
    )
}

export default RewardNavigator;