import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<any[]>([]);

  async function carregarFavoritos() {
    const dados =
      await AsyncStorage.getItem("favoritos");

    if (dados) {
      setFavoritos(JSON.parse(dados));
    } else {
      setFavoritos([]);
    }
  }

  async function removerFavorito(id: any) {
    Alert.alert(
      "Remover favorito",
      "Deseja remover esta escola?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
            const novaLista =
              favoritos.filter(
                (item) => item.id !== id
              );

            setFavoritos(novaLista);

            await AsyncStorage.setItem(
              "favoritos",
              JSON.stringify(novaLista)
            );
          },
        },
      ]
    );
  }

  useEffect(() => {
    carregarFavoritos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) =>
          item.id.toString()
        }
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
                {item.NO_ENTIDADE}
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
                🗑️ Remover
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
    backgroundColor: "#f4f7fb",
    padding: 16,
  },

  vazio: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#64748b",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  nome: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 5,
  },

  local: {
    color: "#64748b",
  },

  botaoRemover: {
    marginTop: 12,
    alignSelf: "flex-start",
  },

  textoRemover: {
    color: "#dc2626",
    fontWeight: "bold",
  },
});