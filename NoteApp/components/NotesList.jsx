import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesList = ({ refresh, setRefresh }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, [refresh]);

    const loadNotes = async () => {
        try {
            const savedNotes = await AsyncStorage.getItem('notes');
            if (savedNotes !== null) {
                const parsedNotes = JSON.parse(savedNotes);
                setNotes(parsedNotes);
            }
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    };

    const deleteNote = async (index) => {
        try {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            setRefresh((prevRefresh) => !prevRefresh);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.note}
            onPress={() => {
                Alert.alert('Note', `Title: ${item.title}\nContent: ${item.content}`);
            }}
        >
            <View style={styles.noteContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.content}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteNote(index)}>
                <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    noteContent: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default NotesList;
