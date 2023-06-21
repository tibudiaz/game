import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my_database.db');

const GalleryScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadImages();
    });

    return unsubscribe;
  }, []);

  const loadImages = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM images;', [], (_, { rows }) => {
        setImages(rows._array);
      });
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Gallery</Text>
      <FlatList
        data={images}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: 300, height: 300, marginBottom: 20 }} />
        )}
      />
    </View>
  );
};

export default GalleryScreen;
