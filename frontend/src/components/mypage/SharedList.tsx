import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export type SharedList = {
  id: string;
  sharingTitle: string;
  status: string; 
  date: string;
};


export type SharedListProps = {
  data: SharedList[];
};

const SharedList = ({data}: SharedListProps) => {
 return ( 
        <View>
           <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.cardLeft}>
                      <Text style={[styles.status, 
                        item.status==='given'? styles.givenBox : styles.recievedBox]}>
                        {item.status==='given'? '나눴어요':'받았어요'}
                      </Text>
                      <Text style={styles.cardTitle}>{item.sharingTitle}</Text>
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
export default SharedList;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20,
  },
  cardLeft: {
    flexDirection : 'row',
    gap: 40,
  },
  cardRight: { 
    justifyContent: 'center', 
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '500',
     marginBottom: 10
  },
  status: {
    fontSize: 15,
    backgroundColor: '#C8F589',
    borderRadius: 10,
    paddingHorizontal: 17,
    textAlignVertical: 'center',
    height: 26,
  },
  givenBox: {
    backgroundColor: '#C8F589',
  },
  recievedBox: {
    backgroundColor: '#e4e4e4',
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