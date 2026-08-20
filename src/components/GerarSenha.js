import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, fonts, comicShadow } from '../theme/persona';

export default function GerarSenha({ ultimaSenha }) {
  const flip = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!ultimaSenha) return;
    flip.setValue(0);
    Animated.spring(flip, { toValue: 1, friction: 6, useNativeDriver: true }).start();
  }, [ultimaSenha]);

  if (!ultimaSenha) return null;

  const rotateY = flip.interpolate({ inputRange: [0, 1], outputRange: ['90deg', '0deg'] });

  return (
    <Animated.View style={[styles.card, { transform: [{ perspective: 800 }, { rotateY }] }]}>
      <Text style={[styles.label, fonts.body]}>SENHA GERADA</Text>
      <Text style={[styles.codigo, fonts.display]}>{ultimaSenha.codigo}</Text>
      <Text style={[styles.info, fonts.body]}>{ultimaSenha.nome} • {ultimaSenha.especialidade}</Text>
      <View style={[styles.tag, ultimaSenha.prioridade === 1 && styles.tagPrioridade]}>
        <Text style={[styles.tagText, fonts.body]}>
          {ultimaSenha.prioridade === 1 ? 'PRIORIDADE' : 'ATENDIMENTO NORMAL'}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.yellow,
    borderWidth: 4,
    borderColor: colors.black,
    padding: 16,
    marginTop: 16,
    ...comicShadow(colors.black, 5),
  },
  label: { fontSize: 12, color: colors.black, letterSpacing: 2 },
  codigo: { fontSize: 38, color: colors.black },
  info: { fontSize: 14, color: colors.black, marginTop: 4 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.black, paddingHorizontal: 10, paddingVertical: 4, marginTop: 10 },
  tagPrioridade: { backgroundColor: colors.red },
  tagText: { color: colors.white, fontSize: 12 },
});