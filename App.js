import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, fonts } from './src/theme/persona';
import { gerarCodigoSenha } from './src/utils/senha';
import CadastroPaciente from './src/components/CadastroPaciente';
import GerarSenha from './src/components/GerarSenha';
import PainelChamada from './src/components/PainelChamada';

export default function App() {
  const [aba, setAba] = useState('cadastro');
  const [fila, setFila] = useState([]);
  const [ultimaSenha, setUltimaSenha] = useState(null);

  function handleCadastrar(paciente) {
    const codigo = gerarCodigoSenha(paciente.especialidade);
    const senha = { ...paciente, codigo };
    setFila((atual) => [...atual, senha]);
    setUltimaSenha(senha);
  }

  function handleChamar(chamada) {
    setFila((atual) => atual.filter((s) => s.codigo !== chamada.codigo));
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={[styles.logo, fonts.display]}>PAINEL SENHA</Text>
      </View>

      <View style={styles.tabs}>
        {[
          { key: 'cadastro', label: 'CADASTRO' },
          { key: 'painel', label: 'PAINEL' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, aba === tab.key && styles.tabAtiva]}
            onPress={() => setAba(tab.key)}
          >
            <Text style={[styles.tabText, fonts.body, aba === tab.key && styles.tabTextAtiva]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {aba === 'cadastro' ? (
          <>
            <CadastroPaciente onCadastrar={handleCadastrar} />
            <GerarSenha ultimaSenha={ultimaSenha} />
          </>
        ) : (
          <PainelChamada fila={fila} onChamar={handleChamar} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.gray },
  topBar: { backgroundColor: colors.yellow, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 4, borderColor: colors.black },
  logo: { fontSize: 22, color: colors.black, letterSpacing: 3 },
  tabs: { flexDirection: 'row' },
  tab: { flex: 1, backgroundColor: colors.black, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 3, borderColor: colors.gray },
  tabAtiva: { backgroundColor: colors.red, borderColor: colors.yellow },
  tabText: { color: '#777', letterSpacing: 1 },
  tabTextAtiva: { color: colors.white },
  content: { padding: 16 },
});