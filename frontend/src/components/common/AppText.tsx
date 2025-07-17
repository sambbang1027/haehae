import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTextSize } from '../../context/TextSizeContext';

const fontSizeMap = {
  small: 15,
  medium: 18,
  large: 22,
};

const AppText = ({ style, children, ...props }: TextProps) => {
  const { size } = useTextSize();

  return (
    <Text style={[style, { fontSize: fontSizeMap[size] }]} {...props} >
      {children}
    </Text>
  );
};

export default AppText;
