import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Navigation from './Navigation';

const db = SQLite.openDatabase('my_database.db');

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT);'
      );
    });
  };

  return <Navigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
