import { View, Text, StyleSheet } from "react-native";

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        🏫 Guia de Escolas Públicas
      </Text>

      <Text style={styles.texto}>
        Este aplicativo foi desenvolvido
        para auxiliar famílias na busca por
        escolas públicas utilizando dados
        oficiais do Censo Escolar do INEP.
      </Text>

      <Text style={styles.texto}>
        É possível pesquisar escolas,
        visualizar informações sobre sua
        infraestrutura e salvar favoritas
        para acesso rápido.
      </Text>

      <Text style={styles.fonte}>
        Fonte dos dados:
      </Text>

      <Text>https://dados.gov.br</Text>

      <Text>https://www.gov.br/inep</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  texto: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },

  fonte: {
    marginTop: 20,
    fontWeight: "bold",
  },
});