// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import Board from './components/Board';

const App = () => {
  const [boardSizeInput, setBoardSizeInput] = useState('3');
  const [boardSize, setBoardSize] = useState(3);
  const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setSquares(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
    setWinner(null);
  }, [boardSize]);

  const handlePress = (index) => {
    const newSquares = [...squares];
    if (winner || newSquares[index]) {
      return;
    }
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(calculateWinner(newSquares));
  };

  const calculateWinner = (squares) => {
    const lines = [];
    for (let i = 0; i < boardSize; i++) {
      // Kiểm tra hàng ngang
      for (let j = 0; j < boardSize - 2; j++) {
        lines.push(Array.from({ length: 3 }, (_, index) => i * boardSize + j + index));
      }
      // Kiểm tra hàng dọc
      for (let j = 0; j < boardSize - 2; j++) {
        lines.push(Array.from({ length: 3 }, (_, index) => i + (j + index) * boardSize));
      }
      // Kiểm tra 3 ô giống nhau liên tiếp theo đường chéo chính
      if (i <= boardSize - 3) {
        for (let j = 0; j < boardSize - 2; j++) {
          lines.push(Array.from({ length: 3 }, (_, index) => (i + index) * (boardSize + 1) + j + index));
        }
      }
      // Kiểm tra 3 ô giống nhau liên tiếp theo đường chéo phụ
      if (i <= boardSize - 3) {
        for (let j = 0; j < boardSize - 2; j++) {
          lines.push(Array.from({ length: 3 }, (_, index) => (i + index) * (boardSize - 1) + (boardSize - 1 - j) - index));
        }
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const symbols = line.map((index) => squares[index]);
      const [firstSymbol] = symbols;
      if (symbols.every((symbol) => symbol === firstSymbol && symbol !== null)) {
        return firstSymbol;
      }
    }
    if (squares.every((square) => square !== null)) {
      return 'draw';
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const handleSizeChange = (text) => {
    setBoardSizeInput(text);
  };

  const handleSizeSubmit = () => {
    const size = parseInt(boardSizeInput);
    if (!isNaN(size) && size >= 3 && size <= 5) {
      setBoardSize(size);
    }
  };

  let status;
  if (winner === 'draw') {
    status = (
      <Text style={[styles.status, { color: '#0074D9' }]}>
        Hòa
      </Text>
    );
  } else if (winner) {
    status = (
      <Text style={[styles.status, { color: '#FF4136' }]}>
        Người chiến thắng: {winner}
      </Text>
    );
  } else {
    status = (
      <Text style={[styles.status, { color: '#001F3F' }]}>
        Lượt kế tiếp: {xIsNext ? 'Người Chơi 1' : 'Người Chơi 2'}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn kích thước bạn muốn chơi (3-5)</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleSizeChange}
        onSubmitEditing={handleSizeSubmit}
        keyboardType="numeric"
        value={boardSizeInput}
      />
      <Text style={[styles.playerText, { color: '#FF4136' }]}>Người chơi 1: X</Text>
      <Text style={[styles.playerText, { color: '#33FF7A' }]}>Người chơi 2: O</Text>
      {status}
      <Board squares={squares} onPress={handlePress} boardSize={boardSize} />
      {(winner === 'draw' || winner) && (
        <View style={styles.buttonContainer}>
          <Button title="Chơi lại" onPress={resetGame} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  status: {
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  playerText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default App;
