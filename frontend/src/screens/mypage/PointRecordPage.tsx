import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import CustomDropDown from '../../components/common/CustomDropDown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useUser } from '../../context/UserContext';
import api from '../../api/AxiosInstance';

type PointHistoryItem = {
  id: number;
  date: string;
  title: string;
  description: string;
  point: string;
  type: '+' | '-';
};

const PointRecord = () => {
  const { user } = useUser();
  const [filterRange, setFilterRange] = useState(1);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [listData, setListData] = useState<PointHistoryItem[]>([]);

  useEffect(() => {
    resetAndFetch();
  }, [filterRange]);

  const resetAndFetch = () => {
    setPage(0);
    setListData([]);
    setHasMore(true);
    getPointRecord(0);
  };

  const getPointRecord = async (pageToLoad: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await api.post("/point/record", {
        userId: user?.userId,
        filterRange,
        page: pageToLoad,
        size: 15,
      });

      if (response.data.code === 'SUCCESS') {
        const pointData = response.data.data.content;

        if (pageToLoad === 0 && pointData.length > 0) {
          setCurrentPoint(pointData[0].currentPoint);
        }

        const trimmedData = pointData.map((item: any) => ({
          id: item.id,
          date: item.createAt,
          title: item.source,
          description: item.pointType,
          point: item.amount,
          type: item.pointType === '사용' ? '-' : '+',
        }));

        setListData(prev => [...prev, ...trimmedData]);
        setPage(prev => prev + 1);
        if (pointData.length < 15) setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      getPointRecord(page);
    }
  };

  const formatNumber = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const renderItem = ({ item }: { item: PointHistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <Text
          style={[styles.point, item.type === '+' ? styles.plus : styles.minus]}
        >
          {item.type + item.point}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={listData}
      extraData={currentPoint}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View>
          <View style={styles.summary}>
            <Text style={styles.availableText}>사용 가능한 포인트</Text>
            <View style={styles.pointRow}>
              <Image source={require('../../assets/icons/point-icon.png')} style={styles.pointIcon} />
              <Text style={styles.totalPoint}>{formatNumber(currentPoint)}P</Text>
            </View>
          </View>

          <View style={styles.devider} />

          <Text style={styles.sectionTitle}>적립/사용 내역</Text>

          <CustomDropDown
            options={['1개월', '3개월', '6개월', '12개월']}
            selected="1개월"
            onSelect={(value) => {
              switch (value) {
                case '1개월': setFilterRange(1); break;
                case '3개월': setFilterRange(3); break;
                case '6개월': setFilterRange(6); break;
                case '12개월': setFilterRange(12); break;
                default: setFilterRange(1); break;
              }
            }}
            width={355}
            buttonStyle={{ backgroundColor: '#fff' }}
            textStyle={{ color: '#333' }}
            contentStyle={{ marginTop: 40, width: 355, backgroundColor: '#FDF8FF' }}
          />

          <View style={styles.listHeader}>
            <Text style={styles.headerText}>내용</Text>
            <Text style={styles.headerText}>적립/사용</Text>
          </View>
        </View>
      }
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.divider}>
            <Text style={styles.guideTitle}>안내</Text>
          </View>
          <Text style={styles.guideText}>• 포인트는 1년의 유효기간이 있습니다.</Text>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 40, backgroundColor: '#fff' }}
    />
  );
};

export default PointRecord;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summary: {
    backgroundColor: 'rgba(249, 235, 255, 0.51)',
    borderRadius: wp('2.5%'),
    padding: wp('6%'),
    height: hp('20%'),
    width: '100%',
  },
  devider: {
    height: hp('0.8%'),
    backgroundColor: '#f0f0f0',
    marginBottom: hp('2%'),
  },
  availableText: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointIcon: {
    width: wp('12%'),
    height: wp('12%'),
    marginRight: wp('2.5%'),
  },
  totalPoint: {
    fontSize: wp('9%'),
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  card: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('6%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: '#f6f6f6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: wp('4%'),
  },
  headerText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    marginHorizontal: wp('4%'),
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  date: {
    fontSize: wp('3.5%'),
    color: '#999',
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginTop: hp('0.5%'),
  },
  description: {
    fontSize: wp('3.8%'),
    color: '#777',
    marginTop: hp('0.5%'),
  },
  point: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  plus: {
    color: '#3e5fff',
  },
  minus: {
    color: '#d02222',
  },
  divider: {
    height: hp('6%'),
    marginVertical: hp('3%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: '#959595',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  guideTitle: {
    fontSize: wp('4.3%'),
    marginHorizontal: wp('5%'),
  },
  guideText: {
    fontSize: wp('3.9%'),
    marginHorizontal: wp('5%'),
    color: '#000',
  },
});