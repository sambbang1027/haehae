import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export type CommentItem = {
  id: string;
  comment: string;
  postTitle: string;
  date: string;
};

export type MyCommentProps = {
  data: CommentItem[];
};

const MyComment = ({data}: MyCommentProps) => {
 return ( 
        <View>
           <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.cardTitle}>{item.comment}</Text>
                      <Text style={styles.cardDesc}>{item.postTitle}</Text>
                    </View>
                    <View style={styles.cardRight}>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
        
              <View style={styles.bottomSpacer} />
        </View>
 )
};
export default MyComment;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20,
  },
  cardLeft: {},
  cardRight: { alignItems: 'flex-end', flexDirection:'column-reverse' },
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
}
});