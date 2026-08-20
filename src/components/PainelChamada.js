import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { colors, fonts, comicShadow } from '../theme/persona';
import { ordenarFila } from '../utils/senha';

export default function PainelChamada({ fila, onChamar }) {
  const [chamada, setChamada] = useState(null);
  const flash = useRef(new Animated.Value(0)).current;

  const filaOrdenada = ordenarFila(fila);

  function chamarProximo() {
    if (filaOrdenada.length === 0) return;
    const proxima = filaOrdenada[0];
    setChamada(proxima);
    onChamar(proxima);

    flash.setValue(1);
    Animated.timing(flash, { toValue: 0, duration: 400, useNativeDriver: true }).start();
  }

  const flashOpacity = flash.interpolate({ inputRange: [0, 1], outputRange: [0, 0.85] });

  return (
    <View>
      <TouchableOpacity style={styles.chamarBtn} onPress={chamarProximo}>
        <Text style={[styles.chamarText, fonts.display]}>CHAMAR PRÓXIMO</Text>
      </TouchableOpacity>

      {chamada && (
        <View style={styles.chamadaAtual}>
          <Text style={[styles.chamadaLabel, fonts.body]}>CHAMANDO AGORA</Text>
          <Text style={[styles.chamadaCodigo, fonts.display]}>{chamada.codigo}</Text>
        </View>
      )}

      <Text style={[styles.filaTitulo, fonts.body]}>FILA ({filaOrdenada.length})</Text>
      <FlatList
        data={filaOrdenada}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.itemCodigo, fonts.display]}>{item.codigo}</Text>
            <Text style={[styles.itemNome, fonts.body]}>{item.nome}</Text>
            {item.prioridade === 1 && <View style={styles.itemPrioridadeMarca} />}
          </View>
        )}
      />

      <Animated.View pointerEvents="none" style={[styles.flashOverlay, { opacity: flashOpacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  chamarBtn: {
    backgroundColor: colors.black,
    borderWidth: 3,
    borderColor: colors.yellow,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 16,
  },
  chamarText: { color: colors.yellow, fontSize: 16, letterSpacing: 1 },
  chamadaAtual: {
    backgroundColor: colors.red,
    borderWidth: 3,
    borderColor: colors.black,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    ...comicShadow(colors.black, 5),
  },
  chamadaLabel: { color: colors.white, fontSize: 12, letterSpacing: 2 },
  chamadaCodigo: { color: colors.white, fontSize: 34 },
  filaTitulo: { fontSize: 14, color: colors.black, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2, borderColor: colors.black, paddingVertical: 8, gap: 8 },
  itemCodigo: { fontSize: 15, color: colors.black, width: 90 },
  itemNome: { fontSize: 14, color: colors.black, flex: 1 },
  itemPrioridadeMarca: { width: 10, height: 10, backgroundColor: colors.red, borderRadius: 5 },
  flashOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.yellow },
});