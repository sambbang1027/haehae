import  firebase  from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import type { Asset } from 'react-native-image-picker';

console.log('Firebase 앱:', firebase.app().name);

export const uploadImageToFirebase = async (
    image: Asset,
    folderName: string
    ): Promise<string> => {
    const filename = image.fileName || `image_${Date.now()}.jpg`;
    const reference = storage().ref(`/${folderName}/${filename}`);
    await reference.putFile(image.uri!);
    return await reference.getDownloadURL();
};