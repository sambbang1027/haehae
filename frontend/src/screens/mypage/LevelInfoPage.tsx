import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useUser } from '../../context/UserContext';
import api from '../../api/AxiosInstance';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LevelInfo = () => {
  const [startDate, setStartDate] = useState<string>();
  const [expiredDate, setExpiredDate] = useState<string>();
  const [levelName, setLevelName] = useState<string | null>(null);
  const [levelImg , setLevelImg] = useState<any>(null);
  const [levelStyle, setLevelStyle] = useState<any>(null);

  const {user} = useUser();

  useEffect(()=>{
    getInfo();
  },[])

  const getInfo = async()=>{
    try{
      const response = await api.get('/level/user/info');

      if(response.data.code == 'SUCCESS'){
        const level = response.data.data.levelName;
        setLevelName(level);

         switch(level){
                case '씨앗':
                  setLevelImg(require('../../assets/icons/seed_level.png'));
                  setLevelStyle({backgroundColor : '#D7B89E', color: '#5C3C19'});
                break;
                case '새싹':
                  setLevelImg(require('../../assets/icons/sprout_level.png'));
                  setLevelStyle({backgroundColor : '#C8F589', color: '#006831'});
                break;
                case '꽃':
                  setLevelImg(require('../../assets/icons/flower_level.png'));
                  setLevelStyle({backgroundColor : '#FFFDBA', color: '#D9A200'});
                break;
                case '나무':
                  setLevelImg(require('../../assets/icons/tree_level.png'));
                  setLevelStyle({backgroundColor : '#C5F4F7', color: '#1F68B1'});
                break;
              }

        setStartDate(response.data.data.levelAchievedAt);
        setExpiredDate(response.data.data.levelExpireAt);
      }
    }catch(error){
      console.error('정보 불러오기 실패', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
     <Shadow
        distance={6}
        startColor={'#DFDFDF'}
        offset={[0, 4]} 
        containerStyle={{ borderRadius: 12, alignSelf: 'center', marginVertical: hp('4%') }}>
        <View style={[levelStyle, styles.currentLevelBox]}>
            <Text style={styles.userName}>{user?.nickname} 님 ,</Text>
            <View style={styles.levelRow}>
              <Image source={levelImg} style={styles.levelIcon} />
              <Text style={[levelStyle, styles.currentLevel]}>{levelName}</Text>
            </View>
            <Text style={[levelStyle, styles.period]}>{startDate} ~ {expiredDate}</Text>
        </View>
    </Shadow>

      <View style={styles.levelBar} />
      <Text style={styles.sectionTitle}>등급 안내</Text>

      <View style={styles.levelGrid}>
        {[
          { name: '씨앗', color: '#774b1c', bg: '#d7b89e', icon: require('../../assets/icons/seed_level.png'), height: hp('12%'), range: '~999P' },
          { name: '새싹', color: '#006831', bg: 'rgba(147, 235, 24, 0.51)', icon: require('../../assets/icons/sprout_level.png'), height: hp('17%'), range: '~4,999P' },
          { name: '꽃', color: '#d9a200', bg: '#fffdba', icon: require('../../assets/icons/flower_level.png'), height: hp('21%'), range: '~14,999P' },
          { name: '나무', color: '#1f68b1', bg: '#c5f4f7', icon: require('../../assets/icons/tree_level.png'), height: hp('25%'), range: '15,000P~' },
        ].map((item, index) => (
          <View key={index}>
            <View style={[styles.levelBox, { backgroundColor: item.bg, height: item.height }]}> 
              <Text style={[styles.levelName, { color: item.color }]}>{item.name}</Text>
              <Image source={item.icon} style={styles.levelImage} />
            </View>
            <Text style={styles.pointRange}>{item.range}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider}>
        <Text style={styles.guideTitle}>안내</Text>
      </View>
      <Text style={styles.guideText}>• 누적된 포인트를 합산하여 등급이 결정됩니다.</Text>
    </ScrollView>
  );
};

export default LevelInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp('2%'),
  },
  currentLevelBox: {
    width: wp('90%'),
    borderRadius: 7,
    padding: wp('6%'),
    shadowColor: '#000',
  },
  userName: {
    fontSize: wp('4.5%'),
    fontWeight: '600'
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%')
  },
  levelIcon: {
    width: wp('10%'),
    height: wp('10%'),
    marginRight: wp('2%')
  },
  currentLevel: {
    fontSize: wp('5%'),
    fontWeight: '800',
  },
  period: {
    fontSize: wp('4%'),
    marginTop: hp('1.5%')
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginHorizontal: wp('5%'),
    marginTop: hp('2%')
  },
  levelBar: {
    height: hp('1%'),
    backgroundColor: '#f0f0f0',
    marginTop: hp('1%')
  },
  levelGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('2%'),
    alignItems: 'flex-end',
  },
  levelBox: {
    borderRadius: 7,
    width: wp('21%'),
    alignItems: 'center',
    paddingVertical: hp('1%'),
    flexDirection:'column-reverse',
    justifyContent:'space-between',
    marginLeft: wp('1.5%')
  },
  levelImage: {
    width: wp('10%'),
    height: wp('10%'),
    marginBottom: hp('1%'),
  },
  levelName: {
    fontSize: wp('4%'),
    fontWeight: '700',
  },
  pointRange: {
    fontSize: wp('3.5%'),
    alignSelf:'center',
    marginTop: hp('1%'),
    fontWeight: '500'
  },
  divider: {
    height: hp('7%'),
    marginVertical: hp('3%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: '#959595',
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('90%')
  },
  guideTitle: {
    fontSize: wp('4%'),
    marginHorizontal: wp('5%'),
  },
  guideText: {
    fontSize: wp('3.8%'),
    marginHorizontal: wp('5%'),
    color: '#000',
    paddingBottom: hp('6%')
  }
});
