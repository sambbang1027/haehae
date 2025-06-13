import storage from '@react-native-firebase/storage';

export const fetchImageUrl = async (folderName: string, filename: string): Promise<string> => {
    const reference = storage().ref(`/${folderName}/${filename}`);
    const url = await reference.getDownloadURL(); 
    return url; 
};