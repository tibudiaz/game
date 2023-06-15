import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('image.db');

const GalleryScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM images;', [], (_, { rows }) => {
        setImages(rows._array);
      });
    });
  }, []);

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
