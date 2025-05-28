import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const TestApiScreen = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    axios.get('http://172.30.1.66:8082/api/test')
      .then(res => {
        setResponse(res.data);
      })
      .catch(err => {
        setResponse('연결 실패: ' + err.message);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{response || '백엔드 연결 확인 중...'}</Text>
    </View>
  );
};

export default TestApiScreen;