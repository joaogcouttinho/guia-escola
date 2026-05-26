import { useFocusEffect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  async function carregarFavoritos() {
    try {
      const dados = await AsyncStorage.getItem("favoritos");

      if (dados) {
        setFavoritos(JSON.parse(dados));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, [])
  );

  async function removerFavorito(id: number) {
    try {
      const novaLista = favoritos.filter(
        (item) => Number(item.id) !== Number(id)
      );

      await AsyncStorage.setItem(
        "favoritos",
        JSON.stringify(novaLista)
      );

      setFavoritos(novaLista);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            ⭐ Nenhuma escola favoritada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/detalhe",
                  params: item,
                })
              }
            >
              <Text style={styles.nome}>
                ❤️ {item.NO_ENTIDADE}
              </Text>

              <Text style={styles.local}>
                📍 {item.NO_MUNICIPIO}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() =>
                removerFavorito(item.id)
              }
            >
              <Text style={styles.textoRemover}>
                Remover
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f7fb",
  },

  vazio: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  local: {
    color: "#666",
  },

  botaoRemover: {
    marginTop: 12,
    backgroundColor: "#e53935",
    padding: 10,
    borderRadius: 8,
  },

  textoRemover: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});