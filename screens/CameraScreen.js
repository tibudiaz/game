import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('my_database.db');

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageSaved, setImageSaved] = useState(false);

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT)'
      );
    });
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos de cámara denegados', 'Lo siento, necesitamos permisos de cámara para que esto funcione.');
      return;
    }
    openCamera();
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setImageSaved(false);
    }
  };

  const saveImage = () => {
    if (imageUri) {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO images (uri) VALUES (?);',
          [imageUri],
          (_, ok) => {
            if (ok) {
              console.log('imagen guardada', ok);
              setImageSaved(true);
              setImageUri(null);
            } else {
              console.log('error al guardar imagen')
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
        <Text>No se ha seleccionado ninguna imagen</Text>
      )}
      <Button title="Abrir Cámara" onPress={requestCameraPermission} />
      <Button title="Guardar Imagen" onPress={saveImage} />
      {imageSaved && <Text>¡La imagen se ha guardado! ¡Mírala en la galería!</Text>}
    </View>
  );
};

export default CameraScreen;
