import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, ViewStyle, ImageStyle, Dimensions } from 'react-native';
import { FlexibleCard as Card, StyleGuide, cards, Selection } from "../components";
import { Transitioning, Transition, TransitioningView } from 'react-native-reanimated';

interface TransitionsProps { }

interface Layout {
    id: string;
    name: string;
    layout: {
        container: ViewStyle;
        child?: ImageStyle;
    };
}

const { width } = Dimensions.get('window');

const column: Layout = {
    id: 'column',
    name: 'Column',
    layout: {
        container: {
            flexDirection: 'column'
        }
    }
};

const row: Layout = {
    id: 'row',
    name: 'Row',
    layout: {
        container: {
            flexDirection: 'row',
            alignItems: 'center'
        }
    }
}

const wrap: Layout = {
    id: 'wrap',
    name: 'Wrap',
    layout: {
        container: {

            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        child: {
            flex: 0,
            width: width / 2 - (StyleGuide.spacing * 2)
        }
    }

}

const layouts = [column, row, wrap];

const transition = <Transition.Change durationMs={400} interpolation="easeInOut" />;

const Transitions = (props: TransitionsProps) => {
    const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
    const ref = useRef<TransitioningView>(null);
    return (
        <>
            <Transitioning.View style={[styles.container, currentLayout.container]} {...{ref, transition}}>
                {cards.map((card) => (
                    <Card key={card.id} style={currentLayout.child} {...{ card }} />
                ))}
            </Transitioning.View>
            {
                layouts.map(layout => <Selection key={layout.id} name={layout.name}
                    isSelected={layout.layout === currentLayout} onPress={() => {
                        if(ref.current) {
                            ref.current.animateNextTransition()
                        }
                        setCurrentLayout(layout.layout)
                    }} />)
            }
        </>
    );
};

export default Transitions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: StyleGuide.palette.background,
    },
});
