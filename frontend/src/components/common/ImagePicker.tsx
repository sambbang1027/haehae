import {launchCamera, launchImageLibrary, Asset} from 'react-native-image-picker';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useModal } from '../../context/ModalContext';
import AppText from './AppText';

const ImagePicker = () =>{
    const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
    const {showModal, hideModal} = useModal();

    const handleImagePicker = () =>{
        showModal(
            {
                type:'bottom',
                content: (
                <View style={styles.modalBox}>
                    <View style={styles.modalSection}>
                    <TouchableOpacity onPress={() => {
                        hideModal();
                        openCamera();
                    }}>
                        <AppText style={{ fontWeight: 700}}>카메라로 촬영</AppText>
                    </TouchableOpacity>
                    <View style={styles.devider}/>
                    <TouchableOpacity onPress={()=>{
                        hideModal();
                        openGallery();
                    }}>
                        <AppText style={{fontWeight: 700}}>사진첩에서 선택</AppText>
                    </TouchableOpacity>
                    <View style={styles.devider}/>
                    <TouchableOpacity onPress={hideModal}>
                        <AppText style={{fontWeight: 700}}>닫기</AppText>
                    </TouchableOpacity>
                    </View>
                </View>
                )
            }
        )
    };
    
    const openCamera = () => {
        launchCamera(
            { mediaType: 'photo'},
            response => {
                const newImage = response?.assets?.[0]; //camera는 보통 1장
                const totalCount = selectedImages.length + (newImage? 1: 0);
                 if (newImage && totalCount<=3) {
                    setSelectedImages(prev => [...prev, ...(newImage as Asset[])]);
                }else if(totalCount>3){
                    showModal({
                        type:'alert',
                        content:'사진은 최대 3장까지 첨부할 수 있습니다.'
                    })
                } 
                else {
                    console.log('카메라 응답 오류:', response?.errorMessage);
                }
            },
        );
    };

    const openGallery = () =>{
        launchImageLibrary(
            {mediaType: 'photo',selectionLimit: 3},
            response =>{
                const newImages = response?.assets ?? [];
                const totalCount = selectedImages.length + newImages.length;
                if(newImages.length>0 && totalCount <=3){
                    setSelectedImages(prev => [...prev, ...(newImages as Asset[])]);
                } else if(totalCount>3 ){
                    showModal({
                        type:'alert',
                        content: '사진은 최대 3장까지 첨부할 수 있습니다.'
                    })
                } else{
                    console.log('사진첩 응답 오류:', response.errorMessage);
                }
            }
        );
    };

    const deletePhoto=(index: number)=>{
        setSelectedImages(prev => prev.filter((_,i)=> i !== index));
    };

    return(
    <View style={styles.imgContainer}>
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleImagePicker}>
            <Text style={styles.imageUploadText}>사진 첨부</Text>
            <Image source={require('../../assets/icons/camera.png')} style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={styles.previewBox}>
            {selectedImages.map((img, index) =>(
            <TouchableOpacity key={index} onPress={()=>{
                deletePhoto(index);
            }}>
                <Image 
                style={styles.delete}
                source={require('../../assets/icons/delete_circle.png')}
                />
                <Image
                    style={styles.preview}
                    source={{uri: img.uri}}
                />
            </TouchableOpacity>
            ))}
        </View>
    </View>    
        
    );
};
export default ImagePicker;

const styles = StyleSheet.create({
    imageUploadBox: {
    width: 70,
    height: 70,
    borderWidth: 0.5,
    borderColor: '#b0b0b0',
    backgroundColor: '#fcfcfc',
    borderRadius: 4,
    marginLeft: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontSize: 12,
    color: '#7d7d7d',
  },
  cameraIcon: {
    width: 37,
    height: 37,
  },
  preview: {
    width: 70,
    height: 70,
    marginTop: 20,
    marginLeft: 10,
  },
  imgContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
    modalBox: {
   justifyContent: 'center',
   flexDirection: 'column',
  },
  modalSection:{
    alignItems: 'center',
    gap: 20,
  },
  devider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '80%',
    marginTop: 10,
  },
  previewBox:{
    flexDirection: 'row'
  },
  delete:{
    position:'absolute',
    left: 65,
    top: 10,
    zIndex: 10,
  }
});