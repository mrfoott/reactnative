import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddNote = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const addNote = async () => {
    if (noteText.trim() !== '') {
      try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = [];

        if (existingNotes !== null) {
          notes = JSON.parse(existingNotes);
        }

        const newNote = {
          title: title !== '' ? title : 'Untitled', // Sử dụng 'Untitled' nếu không có tiêu đề
          content: noteText,
        };

        notes.push(newNote);
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        setTitle('');
        setNoteText('');
        onAdd();
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.titlee}>Note App Using AsyncStorage</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title..."
      />
      <TextInput
        style={styles.input}
        value={noteText}
        onChangeText={(text) => setNoteText(text)}
        placeholder="Note content..."
        multiline
      />
      <Button title="Save" onPress={addNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
    backgroundColor: '#fff',
  },
  titlee: {
    fontSize: 30
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default AddNote;