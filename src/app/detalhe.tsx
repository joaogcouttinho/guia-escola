import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DetalheScreen() {
  const escola: any = useLocalSearchParams();

  function verificar(valor: any) {
    return (
      valor === true ||
      valor === "true" ||
      valor === 1 ||
      valor === "1"
    );
  }

  async function favoritar() {
    try {
      const favoritosSalvos =
        await AsyncStorage.getItem("favoritos");

      let favoritos = favoritosSalvos
        ? JSON.parse(favoritosSalvos)
        : [];

      const jaExiste = favoritos.some(
        (item: any) => item.id === escola.id
      );

      if (jaExiste) {
        Alert.alert(
          "Favoritos",
          "Esta escola já está salva."
        );
        return;
      }

      favoritos.push(escola);

      await AsyncStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
      );

      Alert.alert(
        "Sucesso",
        "Escola adicionada aos favoritos."
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerCard}>
        <Text style={styles.titulo}>
          {escola.NO_ENTIDADE}
        </Text>

        <Text style={styles.local}>
          📍 {escola.NO_MUNICIPIO}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Endereço
        </Text>

        <Text style={styles.valor}>
          {escola.DS_ENDERECO || "Não informado"}
        </Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>
          Etapa de Ensino
        </Text>

        <Text style={styles.valor}>
          {escola.TP_ETAPA_ENSINO ||
            "Não informado"}
        </Text>

        <View style={styles.divisor} />

        <Text style={styles.label}>
          Matrículas
        </Text>

        <Text style={styles.valor}>
          {Number(escola.QT_MATRICULAS) > 0
            ? escola.QT_MATRICULAS
            : "Não informado"}
        </Text>
      </View>

      <Text style={styles.subtitulo}>
        Estrutura da Escola
      </Text>

      <View style={styles.badges}>
        <Text style={styles.badge}>
          📚 Biblioteca{" "}
          {verificar(escola.IN_BIBLIOTECA)
            ? "✅"
            : "❌"}
        </Text>

        <Text style={styles.badge}>
          🌐 Internet{" "}
          {verificar(escola.IN_INTERNET)
            ? "✅"
            : "❌"}
        </Text>

        <Text style={styles.badge}>
          🏀 Quadra{" "}
          {verificar(
            escola.IN_QUADRA_ESPORTES
          )
            ? "✅"
            : "❌"}
        </Text>

        <Text style={styles.badge}>
          ♿ Acessibilidade{" "}
          {verificar(
            escola.IN_ACESSIBILIDADE
          )
            ? "✅"
            : "❌"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={favoritar}
      >
        <Text style={styles.botaoTexto}>
          ⭐ Adicionar aos Favoritos
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  headerCard: {
    backgroundColor: "#1565c0",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },

  titulo: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  local: {
    color: "#dbeafe",
    marginTop: 8,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 3,
  },

  label: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 4,
  },

  valor: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },

  divisor: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 15,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e293b",
  },

  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  badge: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
  },

  botao: {
    backgroundColor: "#1976d2",
    padding: 16,
    borderRadius: 14,
    marginTop: 15,
    marginBottom: 30,
  },

  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});