import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleNoteAddition = () => {
    setRefresh(!refresh);
  };

  return (
    <View style={styles.container}>
      <AddNote onAdd={handleNoteAddition} />
      <NotesList key={refresh ? 'refreshKey' : 'regularKey'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
