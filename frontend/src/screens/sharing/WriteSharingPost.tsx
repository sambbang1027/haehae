import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function WriteSharingPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    console.log('제목:', title);
    console.log('내용:', content);
  };

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.label}>제목</Text>
            <TextInput
            style={styles.input}
            value={title}
            keyboardType="default"
            onChangeText={setTitle}
            placeholder="제목을 입력하세요"
            />

            <Text style={styles.label}>내용</Text>
            <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            keyboardType="default"
            onChangeText={setContent}
            placeholder="내용을 입력하세요"
            multiline
            />

            <Image style={styles.selectImage} source = {require('../../assets/postPhoto.png')}></Image>
        </ScrollView>
        <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
            <Text style={styles.postButtonText}>게시하기</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 20,
  },
  textArea: {
    height: 300,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    margin: 18,
    width: 380,
  },
  postButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectImage: {
    width: 60,
    height: 60,
    marginTop: 20,
  },
});
