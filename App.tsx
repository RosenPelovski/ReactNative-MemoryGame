import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from 'react-native';
import Grid from './components/Grid';
import Card from './components/Card';
import AppButton from './components/AppButton';

let cardSize = Dimensions.get('window').width / 5;

const images = [
  { id: 1, src: require('./images/tileImages/01_Yara-NTester.png') },
  { id: 2, src: require('./images/tileImages/02_YaraTera.png') },
  { id: 3, src: require('./images/tileImages/03_YaraBela.png') },
  { id: 4, src: require('./images/tileImages/04_YaraVita.png') },
  { id: 5, src: require('./images/tileImages/05_YaraVera.png') },
  { id: 6, src: require('./images/tileImages/06_YaraRega.png') },
  { id: 7, src: require('./images/tileImages/07_YaraMila.png') },
  { id: 8, src: require('./images/tileImages/08_YaraLiva.png') },
];
interface Level {
  columns: number;
  count: number;
}

let difficultyTypes = {
  //Easy (2x4 grid) | 8 cards (4 different images)
  easy: { columns: 2, count: 4 },
  //Medium (3x4 grid) | 12 cards (6 different images)
  medium: { columns: 3, count: 6 },
  //Hard (4x4 grid) | 16 cards (8 different images)
  hard: { columns: 4, count: 8 },
};

const App = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [level, setLevel] = useState(difficultyTypes.easy);
  const [menu, goToMenu] = useState(true);

  //when solved
  useEffect(() => {
    if (solved.length == level.count * 2) {
      //start new game at same lavel
      setTimeout(() => {
        game(level);
      }, 2000);
    }
  }, [solved]);

  const shuffleArray = (array: any[]) => {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setupItems = (items: any[], count: number) => {
    //shuffle the cards and take the first few as needed for the level of the game
    let shuffledCards = shuffleArray(items).slice(0, count);
    //we take twice the array and so return two of each shuffled
    return shuffleArray([...shuffledCards, ...shuffledCards]);
  };

  const game = (level: Level) => {
    setLevel(level);
    let currentGameCards = setupItems(images, level.count);
    setCards(currentGameCards);
    setFlipped([]);
    setSolved([]);
    goToMenu(false);
  };

  const onPress = (idx: number) => {

    if (flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) {
      return;
    }

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        // Match found
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
      } else {
        // Wait for a moment and then flip the cards back
        setTimeout(() => {
          setFlipped([]);
        }, 2000);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Yara Memory Game'}</Text>
      </View>

      <View style={styles.mainBoard}>
        {(menu && (
          <>
            <Text style={styles.mediumText}>{'Select Difficulty'}</Text>
            <Grid
              columnsCount={1}
              items={[
                <AppButton
                  title="EASY"
                  onPress={() => game(difficultyTypes.easy)}
                />,
                <AppButton
                  title="MEDIUM"
                  onPress={() => game(difficultyTypes.medium)}
                />,
                <AppButton
                  title="HARD"
                  onPress={() => game(difficultyTypes.hard)}
                />,
              ]}
            />
          </>
        )) || (
            <>
              <View style={{ marginBottom: '10%' }}>
                <AppButton title="↻" onPress={() => goToMenu(true)} />
                <Text style={styles.smalText}>{'New Game'}</Text>
              </View>
              <Grid
                columnsCount={level.columns}
                items={cards.map(({ id, src }, i) => (
                  <Card
                    imgSrc={src}
                    size={cardSize}
                    isOpen={flipped.includes(i) || solved.includes(i)}
                    onTouchHandler={() => onPress(i)}
                  />
                ))}
              />
            </>
          )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: '5%',
  },
  mediumText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  smalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainBoard: {
    alignSelf: 'center',
    padding: '10%',
    margin: 'auto',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
});

export default App;
