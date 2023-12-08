import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AppStyles } from '../utils/styles';
import { getImage } from '../utils/Supabase';

const Reciever = ({ id, first_name, last_name, image_url, onPress }) => {
  const styles = AppStyles();
  const [isSelected, setIsSelected] = useState(false);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        console.log(image_url);
        const data = await getImage(image_url); // Assuming image_url is the path to the image
        setImageData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    fetchImage();
  }, [image_url]); // Run this effect whenever image_url changes

  // Function to construct image URL
  const constructImageUrl = (imagePath) => {
    // Replace 'your-supabase-bucket-url' with your actual Supabase storage bucket URL
    const supabaseBucketUrl = 'https://supabase.com/dashboard/project/xtdwstdpktqgpnqyjamj/storage/buckets/files';
    return `https://xtdwstdpktqgpnqyjamj.supabase.co/storage/v1/object/public/files/${imagePath}`;
  };

  const handlePress = () => {
    setIsSelected(!isSelected);
    onPress({ id, first_name, last_name, image_url, isSelected: !isSelected });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: 'column', alignItems: 'center', margin: 5 }}>
          <Image source={{ uri: constructImageUrl(image_url) }} style={styles.resultsImage} />
        {isSelected && (
          <View style={styles.checkmarkContainer}>
            <View style={styles.checkmarkCircle}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
        <Text style={styles.resultsName}>{first_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Reciever;
