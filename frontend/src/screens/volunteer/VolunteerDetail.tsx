import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { VolunteerStackParamList } from "../../navigation/VolunteerNavigator";

type VolunteerDetailRouteProps = RouteProp<VolunteerStackParamList, "VolunteerDetail">;

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
    padding: wp('5%'),
    paddingBottom: hp('10%'),
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: "bold",
    marginBottom: hp('0.7%'),
  },
  subInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp('2%'),
  },
  date: {
    fontSize: wp('3.2%'),
    color: "#444",
  },
  region: {
    fontSize: wp('3.2%'),
    color: "#444",
  },
  imageBox: {
    width: "100%",
    height: hp('35%'),
    backgroundColor: "#eee",
    borderRadius: wp('3%'),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp('2.5%'),
  },
  description: {
    fontSize: wp('3.8%'),
    marginBottom: hp('2.5%'),
    lineHeight: hp('2.8%'),
  },
  row: {
    flexDirection: "row",
    marginBottom: hp('1.2%'),
  },
  label: {
    fontWeight: "bold",
    marginRight: wp('2.5%'),
    fontSize: wp('3.8%'),
  },
  value: {
    fontSize: wp('3.8%'),
  },
  button: {
    position: "absolute",
    bottom: hp('1.5%'),
    left: wp('5%'),
    right: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('2.5%'),
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: wp('4.2%'),
    color: "#000",
  },
});

