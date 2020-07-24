import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, cards } from "../components";
import Animated, { Value, startClock, useCode, add, interpolate, Extrapolate, cond, eq, set, not, proc } from 'react-native-reanimated';
import { useValues, useClock } from 'react-native-redash';

interface ClockValuesProps { }

const duration = 600;

const runAnimation = proc((
  startAnimation: Animated.Value<number>,
  clock: Animated.Clock,
  from: Animated.Value<number>,
  to: Animated.Value<number>,
  startTime: Animated.Value<number>,
  opacity: Animated.Node<number>) => cond(eq(startAnimation, 1), [
    startClock(clock),
    set(from, opacity),
    set(to, not(to)),
    set(startTime, clock),
    set(startAnimation, 0)
  ]));

const ClockValues = (props: ClockValuesProps) => {
  const [show, setShow] = useState(true);
  const clock = useClock();
  const [startTime, from, to] = useValues(0, 0, 0);
  const startAnimation = new Value(1);

  const endTime = add(startTime, duration);
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP
  })
  useCode(() =>
    runAnimation(startAnimation, clock, from, to, startTime, opacity)
    , [clock, startTime, startAnimation, to, from, opacity]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={{ opacity }}>
          <Card card={cards[0]} />
        </Animated.View>
      </View>
      <Button label={show ? "Hide" : "Show"} primary onPress={() => setShow(prev => !prev)} />
    </View>
  );
};

export default ClockValues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
