import { useState } from 'react';
import type { Asset } from 'react-native-image-picker';
import { pickImages as pickImagesUtil } from '../utils/ImagePicker';

export function useImagePicker() {
    const [images, setImages] = useState<Asset[]>([]);

    const pickImages = async () => {
        try {
        const selected = await pickImagesUtil();
        setImages(selected);
        } catch (error) {
        console.warn('이미지 선택 실패:', error);
        }
    };

    const deleteImage = (indexToDelete: number) => {
        setImages(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    return { images, pickImages, deleteImage };
}