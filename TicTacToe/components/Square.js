import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Square = ({ value, onPress }) => {
  let textColor = '#000'; // Màu mặc định
  if (value === 'X') {
    textColor = 'red'; // Màu đỏ cho 'X'
  } else if (value === 'O') {
    textColor = 'green'; // Màu xanh lá cây cho 'O'
  }

  return (
    <TouchableOpacity style={styles.square} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
  },
});

export default Square;