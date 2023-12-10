import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Board = ({ squares, onPress, boardSize }) => {
  const renderSquare = (index) => {
    let textColor = '#000'; // Màu chữ mặc định là đen
    if (squares[index] === 'X') {
      textColor = '#FF5733'; // Màu đỏ cho X
    } else if (squares[index] === 'O') {
      textColor = '#33FF7A'; // Màu xanh lá cho O
    }

    return (
      <TouchableOpacity key={index} style={styles.square} onPress={() => onPress(index)}>
        <Text style={[styles.text, { color: textColor }]}>{squares[index]}</Text>
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const board = [];
    for (let i = 0; i < boardSize; i++) {
      const row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(renderSquare(i * boardSize + j));
      }
      board.push(<View key={i} style={styles.boardRow}>{row}</View>);
    }
    return board;
  };

  return <View>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
  square: {
    width: 50,
    height: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  boardRow: {
    flexDirection: 'row',
  },
});

export default Board;