import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts, comicShadow } from '../theme/persona';
import { getEspecialidades } from '../utils/senha';

export default function CadastroPaciente({ onCadastrar }) {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('M');

  function handleSubmit() {
    if (!nome || !idade) return;
    const idadeNum = parseInt(idade, 10);
    const { grupo, prioridade, opcoes } = getEspecialidades(idadeNum);

    onCadastrar({
      nome,
      idade: idadeNum,
      sexo,
      grupo,
      prioridade,
      especialidade: opcoes[0],
      criadoEm: Date.now(),
    });

    setNome('');
    setIdade('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.bannerWrapper}>
        <View style={styles.bannerDiagonal} />
        <Text style={[styles.bannerText, fonts.display]}>CADASTRO</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={[styles.input, fonts.body]}
          placeholder="Nome do paciente"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, fonts.body]}
          placeholder="Idade"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
        />

        <View style={styles.sexoRow}>
          {['M', 'F'].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[styles.sexoBtn, sexo === opcao && styles.sexoBtnAtivo]}
              onPress={() => setSexo(opcao)}
            >
              <Text style={[styles.sexoText, fonts.body, sexo === opcao && styles.sexoTextAtivo]}>
                {opcao === 'M' ? 'Masculino' : 'Feminino'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={[styles.submitText, fonts.display]}>GERAR SENHA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  bannerWrapper: { height: 60, justifyContent: 'center', marginBottom: 16, overflow: 'hidden' },
  bannerDiagonal: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: 0,
    bottom: 0,
    backgroundColor: colors.black,
    transform: [{ skewY: '-3deg' }],
  },
  bannerText: { fontSize: 26, color: colors.yellow, paddingLeft: 20 },
  card: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.black,
    borderRadius: 4,
    padding: 20,
    ...comicShadow(colors.red, 6),
  },
  input: { borderWidth: 2, borderColor: colors.black, borderRadius: 2, padding: 10, marginBottom: 12 },
  sexoRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  sexoBtn: { flex: 1, borderWidth: 2, borderColor: colors.black, paddingVertical: 8, alignItems: 'center' },
  sexoBtnAtivo: { backgroundColor: colors.yellow },
  sexoText: { color: colors.black },
  sexoTextAtivo: { color: colors.black },
  submitBtn: {
    backgroundColor: colors.red,
    borderWidth: 3,
    borderColor: colors.black,
    paddingVertical: 14,
    alignItems: 'center',
    transform: [{ skewX: '-6deg' }],
    ...comicShadow(colors.black, 4),
  },
  submitText: { fontSize: 16, color: colors.white, transform: [{ skewX: '6deg' }] },
});