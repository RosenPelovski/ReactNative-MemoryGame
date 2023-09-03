import { View, StyleSheet } from 'react-native';

type GridProps = {
    columnsCount: number;
    items: any[];
};

export default function Grid({ columnsCount, items }: GridProps) {


    const splitArray = (array: any[], size: number) => {
        let result = [];
        for (let i = 0; i < array.length; i += size) {
            let chunk = array.slice(i, i + size);
            result.push(chunk);
        }
        return result;
    };
    return (
        <View>
            {splitArray(items, columnsCount).map((rows, i) => (
                <View
                    key={`row_${i}`}
                    style={styles.row}>
                    {rows.map((item, ii) => <View key={`row_${i}_item_${ii}`}>{item}</View>)}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});
