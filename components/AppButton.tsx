import { GestureResponderEvent, Platform } from 'react-native';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
};

const AppButton = ({ onPress, title }: ButtonProps): JSX.Element => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.appButtonContainer, styles.shadow]}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    boxShadow: '5px 10px 18px #888888',
    backgroundColor: 'white',
    margin: '4%',
  },
  appButtonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 5,
        backgroundColor: 'rgba(0, 0, 0, 1)',
      },
    }),
  },
});

export default AppButton;
