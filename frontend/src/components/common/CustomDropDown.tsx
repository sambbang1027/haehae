import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';

type DropDownProps = {
  options: string[];
  selected?: string;
  onSelect: (value: string) => void;
  width?: number;
  buttonStyle?: object;
  textStyle?: object;
  contentStyle?: object
};

const CustomDropDown = ({
  options,
  selected = '기간 선택',
  onSelect,
  width = 345,
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

  return (
    <View style={[styles.menuWrapper, { width }]}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[styles.customButton, { width }, buttonStyle]}
          >
            <Text style={[styles.customButtonText, textStyle]}>
              {selectedPeriod} ▾
            </Text>
          </TouchableOpacity>
        }
        contentStyle={contentStyle}
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
    marginTop: 10,
    zIndex: 10,
    alignSelf:'center'
  },
  customButton: {
    borderWidth: 1,
    height: 40,
    borderRadius: 7,
    borderColor: '#909090',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  customButtonText: {
    fontSize: 15,
    color: '#99999',
  },
});

export default CustomDropDown;
