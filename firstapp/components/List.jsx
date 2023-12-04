// List.jsx
import React from 'react';
import { View, StyleSheet, FlatList, Text, Image } from 'react-native';

const List = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.content}</Text>
      {item.image && <Image style={styles.image} source={{ uri: item.image }} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 10,
  },
});

export default List;
