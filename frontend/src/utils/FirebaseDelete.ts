import storage from '@react-native-firebase/storage';

export const deleteImageFromFirebase = async (imageUrl: string): Promise<void> => {
    try {
        const reference = storage().refFromURL(imageUrl);
        await reference.delete();
        console.log('이미지 삭제 성공:', imageUrl);
    } catch (error) {
        console.error('이미지 삭제 실패:', error);
    }
};