import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function SobreScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.emoji}>🏫</Text>

      <Text style={styles.titulo}>
        Guia de Escolas Públicas
      </Text>

      <Text style={styles.subtitulo}>
        Aplicativo educacional desenvolvido
        em React Native com Expo.
      </Text>

      <View style={styles.card}>
        <Text style={styles.texto}>
          O aplicativo auxilia famílias na
          busca por escolas públicas usando
          dados oficiais do Censo Escolar do
          INEP.
        </Text>

        <Text style={styles.texto}>
          É possível pesquisar escolas,
          visualizar infraestrutura,
          consultar etapas de ensino e
          salvar favoritas para acesso
          rápido.
        </Text>

        <Text style={styles.aviso}>
          Algumas informações podem aparecer
          como “Não informado”, pois certos
          dados não estão disponíveis na
          base pública original utilizada
          pelo aplicativo.
        </Text>
      </View>

      <Text style={styles.secao}>
        📚 Dados Utilizados
      </Text>

      <Text style={styles.info}>
        • Censo Escolar (INEP)
      </Text>

      <Text style={styles.info}>
        • Dados públicos do governo federal
      </Text>

      <Text style={styles.info}>
        • Base filtrada em JSON
      </Text>

      <Text style={styles.secao}>
        🔗 Fontes Oficiais
      </Text>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://dados.gov.br"
          )
        }
      >
        <Text style={styles.link}>
          https://dados.gov.br
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://www.gov.br/inep"
          )
        }
      >
        <Text style={styles.link}>
          https://www.gov.br/inep
        </Text>
      </TouchableOpacity>

      <Text style={styles.rodape}>
        UNICAP • Programação Web e Mobile
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f7fb",
    padding: 24,
    alignItems: "center",
  },

  emoji: {
    fontSize: 55,
    marginTop: 30,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565c0",
    marginTop: 10,
    textAlign: "center",
  },

  subtitulo: {
    color: "#64748b",
    marginTop: 8,
    marginBottom: 25,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    marginBottom: 25,
    elevation: 3,
  },

  texto: {
    fontSize: 16,
    lineHeight: 25,
    color: "#334155",
    marginBottom: 14,
  },

  aviso: {
    fontSize: 14,
    lineHeight: 22,
    color: "#b45309",
    backgroundColor: "#fff7ed",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  secao: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 10,
    marginTop: 10,
  },

  info: {
    alignSelf: "flex-start",
    fontSize: 15,
    color: "#475569",
    marginBottom: 8,
  },

  link: {
    color: "#1976d2",
    marginBottom: 10,
    fontWeight: "600",
  },

  rodape: {
    marginTop: 30,
    marginBottom: 20,
    color: "#94a3b8",
    fontSize: 13,
  },
});