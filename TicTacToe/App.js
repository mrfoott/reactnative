import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Board from './components/Board';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

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
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) {
      return 'draw';
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF7A', '#336CFF', '#FF33E9', '#E9FF33'];
    return colors[Math.floor(Math.random() * colors.length)];
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
      <Text style={[styles.playerText, { color: '#FF4136' }]}>Người chơi 1: X</Text>
      <Text style={[styles.playerText, { color: '#33FF7A' }]}>Người chơi 2: O</Text>
      {status}
      <Board squares={squares} onPress={handlePress} />
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
