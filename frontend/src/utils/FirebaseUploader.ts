import storage from '@react-native-firebase/storage';
import type { Asset } from 'react-native-image-picker';
import uuid from 'react-native-uuid'


export const uploadImageToFirebase = async (
    image: Asset,
    folderName: string
    ): Promise<string> => {
    const ext = image.fileName?.split('.').pop() || 'jpg';
    const filename = `${uuid.v4()}.${ext}`;
    const reference = storage().ref(`/${folderName}/${filename}`);
    await reference.putFile(image.uri!);
    return await reference.getDownloadURL();
};
