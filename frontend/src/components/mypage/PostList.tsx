import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import { ImageSourcePropType } from 'react-native'; // 프론트 작업할 때 삭제 요망

export type PostItem = {
  id: string;
  postTitle: string;
  postImage: ImageSourcePropType; // 추후 String
  date: string;
};

export type MyPostProps = {
  data: PostItem[];
};

const MyPost = ({data}: MyPostProps) => {
 return ( 
        <View>
           <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // 한 줄에 2개
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.cardImage}>
                    {item.postImage ? (
                        <Image
                        source={item.postImage}
                        style={styles.postImage}
                        resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.noImageBox}>
                        <Image
                            source={require('../../assets/icons/noPhoto.png')}
                            style={styles.noImage}
                            resizeMode="cover"
                        />
                        </View>
                    )}
                    </View>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle}>{item.postTitle}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                  </View>
                )}
              />
        
              <View style={styles.bottomSpacer} />
        </View>
 )
};
export default MyPost;
const styles = StyleSheet.create({
  card: {
    flexDirection:'column',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20,
  },
  cardInfo: { 
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
     marginBottom: 10
  },
  cardDesc: {
    fontSize: 15,
    color: '#787878',
  },
  label: {
    fontSize: 15,
    color: '#787878',
  },
  date: {
    fontSize: 15,
    color: '#787878',
  },
  bottomSpacer: {
    height: 50,
},
  cardImage: {
  width: '100%',
  height: 150,
  overflow: 'hidden',
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center', 
},

postImage: {
  width: '100%',
  height: '100%',
},

noImageBox: {
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},

noImage: {
  width: '50%',
  height: '50%',
  tintColor: '#aaa',
},
});