import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type DropDownProps = {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  widthPercent?: number; // 화면 비율로 폭 조절
  buttonStyle?: object;
  textStyle?: object;
  contentStyle?: object;
};

const CustomDropDown = ({
  options,
  selected = '기간 선택',
  onSelect,
  widthPercent = 90, // 기본 90%
  buttonStyle,
  textStyle,
  contentStyle,
}: DropDownProps) => {
  const [visible, setVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(selected);

  const handleSelect = (value: string) => {
    setSelectedPeriod(value);
    setVisible(false);
    onSelect(value);
  };

  const width = wp(`${widthPercent}%`);

  return (
    <View style={[styles.menuWrapper, { width }]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.customButton, { width, height: hp('5%') }, buttonStyle]}
          >
            <Text style={[styles.customButtonText, { fontSize: wp('4%') }, textStyle]}>
              {selectedPeriod} ▾
            </Text>
          </TouchableOpacity>
        }
        contentStyle={[{ width }, contentStyle]}
      >
        {options.map((label) => (
          <Menu.Item
            key={label}
            onPress={() => handleSelect(label)}
            title={label}
            
          />
        ))}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    alignItems: 'center',
    marginTop: hp('1.5%'),
    zIndex: 10,
    alignSelf: 'center',
  },
  customButton: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#909090',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  customButtonText: {
    color: '#333',
  },
});

export default CustomDropDown;
