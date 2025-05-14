import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/types";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VolunteerDetailRouteProps = RouteProp<RootStackParamList, "VolunteerDetail">;

export default function VolunteerDetail() {
  const route = useRoute<VolunteerDetailRouteProps>();
  const { id } = route.params;

  const postData = [
    {
      id: 1,
      title: "서울시 담배꽁초 줍기 봉사",
      nickname: "서울시청",
      status: "모집중",
      place: "서울시 한강공원",
      color: "#C7F4C2",
      description: "서울특별시청에서 담배 꽁초 줍기 봉사자를 구합니다.",
      image: "", // 이미지 경로 넣을 자리
      date: "2025-05-01",
      location: "서울시 한강공원",
      people: "50명",
    },
  ];

  const post = postData.find((p) => p.id === id);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>해당 봉사 정보를 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 헤더 텍스트 */}
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.subInfo}>
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.region}>{post.nickname}</Text>
        </View>

        {/* 이미지 자리 */}
        <View style={styles.imageBox}>
          {/* <Image source={require("...")} style={styles.image} /> */}
          <Text>[이미지 자리]</Text>
        </View>

        {/* 설명 */}
        <Text style={styles.description}>{post.description}</Text>

        {/* 장소 */}
        <View style={styles.row}>
          <Text style={styles.label}>장소</Text>
          <Text style={styles.value}>{post.place}</Text>
        </View>

        {/* 인원 수 */}
        <View style={styles.row}>
          <Text style={styles.label}>👥</Text>
          <Text style={styles.value}>{post.people}</Text>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: post.color }]}
        onPress={() => Linking.openURL("https://example.com")}
      >
        <Text style={styles.buttonText}>참여하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    color: "#444",
  },
  region: {
    fontSize: 12,
    color: "#444",
  },
  imageBox: {
    width: "100%",
    height: 300,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 14,
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});
