import { Pressable, Animated, StyleSheet, ImageURISource } from 'react-native';
import React, { useEffect, useRef } from 'react';

type CardProps = {
  imgSrc: ImageURISource;
  size: number;
  isOpen: boolean;
  onTouchHandler: () => void;
};

export default function Card({
  imgSrc,
  size,
  isOpen,
  onTouchHandler,
}: CardProps): JSX.Element {
  useEffect(() => {
    if (isOpen) {
      flipToFront();
    } else {
      flipToBack();
    }
  }, [isOpen]);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => (flipRotation = value));
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={{ borderWidth: 1, borderRadius: 5 }}
      onPress={() => onTouchHandler()}>
      <Animated.Image
        style={{
          ...style.cardFront,
          ...flipToBackStyle,
          width: size,
          height: size,
          borderRadius: 5,
        }}
        source={imgSrc}
      />
      <Animated.Image
        style={{
          ...style.cardBack,
          ...flipToFrontStyle,
          width: size,
          height: size,
          borderRadius: 5,
        }}
        source={require('../images/tileImages/09_YaraPrideLogo.png')}
      />
    </Pressable>
  );
}
const style = StyleSheet.create({
  cardFront: { flex: 1, position: 'absolute' },
  cardBack: { backfaceVisibility: 'hidden' },
});
