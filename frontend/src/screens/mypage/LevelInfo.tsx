import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Shadow } from 'react-native-shadow-2';

const LevelInfo: React.FC = () => {
  const navigation = useNavigation();
  const userName = '킹도훈';
  const currentLevel = '새싹 등급';
  const period = '2025.01.05 ~ 2025.06.04';


  return (
    <ScrollView style={styles.container}>
     <Shadow
        distance={10}
        startColor={'#00000010'}
        offset={[0, 4]} 
        containerStyle={{ borderRadius: 12,  alignSelf: 'center', marginVertical: 30 }}
        >
        <View style={styles.currentLevelBox}>
            <Text style={styles.userName}>{userName}님</Text>
            <View style={styles.levelRow}>
            <Image source={require('../../assets/icons/sprout_level.png')} style={styles.levelIcon} />
            <Text style={styles.currentLevel}>{currentLevel}</Text>
            </View>
            <Text style={styles.period}>{period}</Text>
        </View>
    </Shadow>

      <Text style={styles.sectionTitle}>등급 안내</Text>
      <View style={styles.levelBar} />

      <View style={styles.levelGrid}>
        <View style={[styles.levelBox, { backgroundColor: '#d7b89e' }]}> 
          <Image source={require('../../assets/icons/seed_level.png')} style={styles.levelImage} />
          <Text style={[styles.levelName, { color: '#774b1c' }]}>씨앗</Text>
          <Text style={styles.pointRange}>0~999P</Text>
        </View>
        <View style={[styles.levelBox, { backgroundColor: 'rgba(147, 235, 24, 0.51)' }]}> 
          <Image source={require('../../assets/icons/sprout_level.png')} style={styles.levelImage} />
          <Text style={[styles.levelName, { color: '#006831' }]}>새싹</Text>
          <Text style={styles.pointRange}>1,000~4,999P</Text>
        </View>
        <View style={[styles.levelBox, { backgroundColor: '#fffdba' }]}> 
          <Image source={require('../../assets/icons/flower_level.png')} style={styles.levelImage} />
          <Text style={[styles.levelName, { color: '#d9a200' }]}>꽃</Text>
          <Text style={styles.pointRange}>5,000~14,999P</Text>
        </View>
        <View style={[styles.levelBox, { backgroundColor: '#c5f4f7' }]}> 
          <Image source={require('../../assets/icons/tree_level.png')} style={styles.levelImage} />
          <Text style={[styles.levelName, { color: '#1f68b1' }]}>나무</Text>
          <Text style={styles.pointRange}>15,000P~</Text>
        </View>
      </View>

      <View style={styles.divider} />
      <Text style={styles.guideTitle}>안내</Text>
      <Text style={styles.guideText}>• 누적된 포인트를 합산하여 등급이 결정됩니다.</Text>
    </ScrollView>
  );
};

export default LevelInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 77,
    borderBottomWidth: 1,
    borderColor: '#bcbcbc',
    paddingHorizontal: 20
  },
  backIcon: {
    width: 30,
    height: 30
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 120
  },
  currentLevelBox: {
    width: 350,
    backgroundColor: '#C8F589',
    borderRadius: 7,
    padding: 20,
    shadowColor: '#000',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600'
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  levelIcon: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  currentLevel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#006831'
  },
  period: {
    fontSize: 16,
    color: '#006831',
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginTop: 10
  },
  levelBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    marginTop: 10
  },
  levelGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30
  },
  levelBox: {
    borderRadius: 7,
    width: 89,
    height: 157,
    alignItems: 'center',
    paddingVertical: 10
  },
  levelImage: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  levelName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5
  },
  pointRange: {
    fontSize: 14
  },
  divider: {
    height: 1,
    backgroundColor: '#959595',
    marginVertical: 30
  },
  guideTitle: {
    fontSize: 17,
    fontWeight: '400',
    marginHorizontal: 20,
    marginBottom: 10
  },
  guideText: {
    fontSize: 15,
    marginHorizontal: 20,
    color: '#000'
  }
});
