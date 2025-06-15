import React from 'react';
import { View, ScrollView, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { Asset } from 'react-native-image-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


type Props = {
    images: Asset[];
    onDelete: (index: number) => void;
    };

    export default function ImagePreviewList({ images, onDelete }: Props) {
    if (images.length === 0) return null;

    return (
        <ScrollView horizontal style={styles.imageScroll}>
        {images.map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img.uri }} style={styles.previewImage} />
            <TouchableOpacity onPress={() => onDelete(index)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>×</Text>
            </TouchableOpacity>
            </View>
        ))}
        </ScrollView>
    );
    }

    const styles = StyleSheet.create({
        imageScroll: {
            marginTop: hp('1%'),
        },
        imageWrapper: {
            position: 'relative',
            marginRight: wp('2.5%'),
            overflow: 'visible',
        },
        previewImage: {
            width: wp('25%'),
            height: wp('25%'),
            borderRadius: wp('2%'),
        },
        deleteButton: {
            position: 'absolute',
            top: hp('0.5%'),
            right: wp('1%'),
            backgroundColor: '#ff5555',
            borderRadius: wp('3.5%'),
            width: wp('6%'),
            height: wp('6%'),
            alignItems: 'center',
            justifyContent: 'center',
        },
        deleteButtonText: {
            color: 'white',
            fontSize: wp('3.5%'),
            fontWeight: 'bold',
        },
});
