import { useState } from "react";
import { uploadImageToFirebase } from "../utils/FirebaseUploader";
import { deleteImageFromFirebase } from "../utils/FirebaseDelete";
import type { Asset } from 'react-native-image-picker';

export const useFireBaseImage = ()=> {
    const [uploading, setUploading] = useState(false); // 업로드 상태
    const [error, setError] = useState<Error | null>(null);

    const uploadImage = async(images: Asset[], folder: string) => {
        setUploading(true);
        try{
            const uploadImageUrls = await Promise.all(
                images.map(async (image) => {
                    const uploadImage = await uploadImageToFirebase(image,folder);
                    return uploadImage;
                })
            );
            return uploadImageUrls;
                
        }catch(err : any){
            setError(err);
            return null;
        }finally{
            setUploading(false);
        }
    }

    const deleteImageFB = async(images: string[]) => {
        try{
            await Promise.all(
                images.map(async (image) => {
                    await deleteImageFromFirebase(image);
                })
            )
        }catch(err : any){
            setError(err);
        }
    }
    return { uploadImage, deleteImageFB, uploading, error };
}