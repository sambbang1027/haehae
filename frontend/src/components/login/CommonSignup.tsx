import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomCheckbox from '../../components/common/CustomCheckBox';
import dayjs from 'dayjs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AddressSearchModal from '../common/AddressSearch';

type CommonState = {
  nickname: string;
  phoneNumber: string;
  birth: Date;
  address: string;
  bcode : string;
  residenceType: string;
};

type Action = { type: 'SET_FIELD'; field: keyof CommonState; value: any } 
            | { type: 'RESET' };

type Props = {
    state : CommonState;
    dispatch : React.Dispatch<Action>;
    showDatePicker : boolean;
    setShowDatePicker : (value : boolean) => void;
    onDuplicateNickname : ()=> void
    onSelectAddress: (address: string, bcode: string) => void;
}


const CommonSignup = ({state, dispatch, showDatePicker,
   setShowDatePicker, onDuplicateNickname} : Props) =>{
const [showAddressModal, setShowAddressModal] = useState(false);
const addressSearch = () => {
  setShowAddressModal(true);
};

    return(
    <View>  
    <View>
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={state.nickname}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'nickname', value: text })}
      />
        <TouchableOpacity style={styles.duplication} onPress={onDuplicateNickname}>
          <Text style={styles.dupText}>중복 확인</Text>
        </TouchableOpacity>
        <Text style={{marginBottom: hp('1%')}}>한글,영어,숫자를 포함한 2~10자까지 가능합니다.</Text>
    </View>  
     
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="휴대전화번호 - 없이 입력"
        value={state.phoneNumber}
        onChangeText={(text) => 
        dispatch({ type: 'SET_FIELD', field: 'phoneNumber', value: text.replace(/[^0-9]/g, '')})}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: '#000' }}>{dayjs(state.birth).format('YYYY년 MM월 DD일')}</Text>
      </TouchableOpacity>

            <DateTimePickerModal
               isVisible={showDatePicker}
                mode="date"
                maximumDate={new Date()}
                onConfirm={(date) => {
                  dispatch({ type: 'SET_FIELD', field: 'birth', value: date });
                  setShowDatePicker(false);
                }}
                onCancel={() => setShowDatePicker(false)}
            />
          
      {/* 주소 API  */}
      <View>
      <TouchableOpacity style={styles.searchAddress} onPress={addressSearch}>
        <TextInput
          style={styles.inputAddress}
          placeholder="주소 검색"
          value={state.address}
          onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'address', value: text })}
          editable ={false} // 직접입력 방지
        />
        <Image source={require('../../assets/icons/search.png')}  style={styles.searchIcon}/>
      </TouchableOpacity>

      {/* 주소 모달  */}
      {showAddressModal && (
        <Modal visible transparent animationType="fade">
          <AddressSearchModal
            onSelect={(addr, code) => {
              dispatch({ type: 'SET_FIELD', field: 'address', value: addr });
              dispatch({ type: 'SET_FIELD', field: 'bcode', value: code });
            }}
            onClose={() => setShowAddressModal(false)}
          />
        </Modal>
      )}
      </View>

      {/* 주거 유형 선택 */}
      <Text style={styles.label}>주거유형</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          <CustomCheckbox
            checked={state.residenceType === 'HOUSE_VILLA'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'HOUSE_VILLA' ? '' : 'HOUSE_VILLA' })}
          />
          <Text style={styles.residenceText}>빌라/주택</Text>
        </View>
        <View style={styles.checkbox}>
          <CustomCheckbox
            checked={state.residenceType === 'APT_OFFICETEL'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'APT_OFFICETEL' ? '' : 'APT_OFFICETEL' })}
          />
          <Text style={styles.residenceText}>아파트/오피스텔</Text>
        </View>
      </View>
    </View>

    );
}


const styles = StyleSheet.create({

  label: {
    marginBottom: hp('1%'),
    color: '#898989',
    fontSize: wp('4%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('7.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    fontSize: wp('4%'),
  },
  duplication:{
    position: 'absolute',
    right: wp('2%'),
    top: hp('1%'),
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  dupText:{
   color: '#5da000',
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%'),
    width: '90%',
  },
  calendarCloseBtn: {
    marginTop: hp('1%'),
    alignSelf: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('6%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  checkbox: {
    flexDirection: 'row'
  },
  residenceText: {
    alignSelf: 'center',
    fontSize: wp('3.5%'),
  },
  searchAddress: {
    flexDirection: 'row',
    width: '100%'
  },
  searchIcon: {
    width : wp('8%'),
    position: 'absolute',
    top : hp('2%'),
    right: wp('5%')  
  },
  inputAddress: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('7.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    fontSize: wp('4%'),
    color: '#000'
  }
});

export default CommonSignup;