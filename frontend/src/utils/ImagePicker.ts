import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import type { Asset } from 'react-native-image-picker';

export const pickImages = async (): Promise<Asset[]> => {
    return new Promise((resolve, reject) => {
        launchImageLibrary(
        { mediaType: 'photo', selectionLimit: 10 },
        (response) => {
            if (response.didCancel) {
            resolve([]);
            } else if (response.errorCode) {
            reject(new Error(response.errorMessage));
            } else {
            resolve(response.assets || []);
            }
        }
        );
    });
};

// export async function takePhoto(): Promise<Asset | null> {
//     return new Promise((resolve, reject) => {
//         launchCamera(
//             { mediaType : 'photo'},
//             (response) => {
//         if (response.didCancel) {
//             reject('사용자가 취소함');
//         } else if (response.errorCode) {
//             reject(response.errorMessage);
//         } else {
//             resolve(response.assets?.[0] || null);
//         }
//         });
//     });
// };