import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('image.db');

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const createDatabase = async () => {
      try {
        const fileName = 'image.db';
        const dbPath = `${FileSystem.documentDirectory}${fileName}`;

        // Copiar la base de datos a la carpeta raíz si no existe
        const databaseExists = await FileSystem.getInfoAsync(dbPath);
        if (!databaseExists.exists) {
          await FileSystem.copyAsync({
            from: require('../assets/image.db'),
            to: dbPath,
          });
        }

        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT);',
            [],
            (_, result) => {
              console.log('Table created successfully:', result);
            },
            (_, error) => {
              console.log('Error creating table:', error);
            }
          );
        });
      } catch (error) {
        console.log('Error creating database:', error);
      }
    };

    createDatabase();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
    openCamera();
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveImage = () => {
    if (imageUri) {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (uri) VALUES (?);',
          [imageUri],
          (_, error) => {
            if (error) {
              console.log('Error saving image:', error);
            } else {
              alert('Image saved successfully!');
              setImageUri(null);
            }
          }
        );
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 300, height: 300, marginBottom: 20 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Open Camera" onPress={requestCameraPermission} />
      <Button title="Save Image" onPress={saveImage} />
    </View>
  );
};

export default CameraScreen;
