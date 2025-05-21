import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatingList() {
    return(
        <SafeAreaView>
            <ScrollView>
                <Text>채팅 목록 스크린입니다. 네비게이터 연결중...</Text>
            </ScrollView>
        </SafeAreaView>
    );
}