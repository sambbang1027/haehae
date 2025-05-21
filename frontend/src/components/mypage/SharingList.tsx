import React from 'react';
import { View, Text, StyleSheet, FlatList,Image, TouchableOpacity } from 'react-native';
import { useModal } from '../../context/ModalContext';
import AppText from '../common/AppText';
import { useToast } from '../../context/ToastContext';

export type SharingItem = {
  id: string;
  sharingTitle: string;
  status: string;
};

export type MySharingProps = {
  data: SharingItem[];
};


const SharingList = ({data}: MySharingProps) => {
  const { showModal, hideModal } = useModal();
  const {showToast} = useToast();

  const handleSharing = () => {
    showModal({
      type: 'bottom',
      content: (
      <View style={styles.modalBox}>
        <View style={styles.modalSection}>
          <TouchableOpacity onPress={() => {
            hideModal();
            handleToast();
          }}>
            <AppText style={{ color :'#5DA000', fontWeight: 700}}>나눔 완료</AppText>
          </TouchableOpacity>
          <View style={styles.devider}/>
          <TouchableOpacity onPress={hideModal}>
            <AppText style={{fontWeight: 700}}>닫기</AppText>
          </TouchableOpacity>
        </View>
      </View>
    ) 
    })
  };

  
  const handleToast = () => {
    showToast({
      message: '나눔이 완료되었습니다!',
    });
  }


 return ( 
        <View>
           <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.status}>{item.status ==='sharing'?'나눔중':''}</Text>
                      <Text style={styles.cardTitle}>{item.sharingTitle}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.cardRight} onPress={handleSharing}>
                        <Image 
                        source={require('../../assets/icons/right_arrow.png')}
                        style={styles.rightArrow}
                        />
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
              />
        
              <View style={styles.bottomSpacer} />
        </View>
 )
};
export default SharingList;
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    gap: 40,
  },
  cardRight: { 
    justifyContent: 'center',
    marginRight: 10,
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
    textAlignVertical : 'center',
    height: 26
  },
  bottomSpacer: {
    height: 50,
  },
  rightArrow: {
    tintColor: '#959595'
  },
  modalBox: {
   justifyContent: 'center',
   flexDirection: 'column',
  },
  modalSection:{
    alignItems: 'center',
    gap: 20,
  },
  devider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginTop: 10,
  }
});