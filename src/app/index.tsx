import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import escolas from "../data/escolas.json";

export default function HomeScreen() {
  const [busca, setBusca] = useState("");
  const [etapa, setEtapa] = useState("Todos");
  const [favoritos, setFavoritos] = useState<any[]>([]);

  useEffect(() => {
    carregarFavoritos();
  }, []);

  async function carregarFavoritos() {
    const dados =
      await AsyncStorage.getItem("favoritos");

    if (dados) {
      setFavoritos(JSON.parse(dados));
    }
  }

  function ehFavorita(id: any) {
    return favoritos.some(
      (item) => item.id === id
    );
  }

  const escolasFiltradas = escolas.filter(
    (escola: any) => {
      const texto = busca.toLowerCase();

      const buscaOk =
        escola.NO_ENTIDADE
          ?.toLowerCase()
          .includes(texto) ||
        escola.NO_BAIRRO
          ?.toLowerCase()
          .includes(texto) ||
        escola.NO_MUNICIPIO
          ?.toLowerCase()
          .includes(texto);

      const etapaOk =
        etapa === "Todos" ||
        escola.TP_ETAPA_ENSINO === etapa;

      return buscaOk && etapaOk;
    }
  );

  const renderFiltro = (
    titulo: string,
    valor: string
  ) => (
    <TouchableOpacity
      style={[
        styles.botaoFiltro,
        etapa === valor &&
          styles.botaoFiltroAtivo,
      ]}
      onPress={() => setEtapa(valor)}
    >
      <Text
        style={[
          styles.textoFiltro,
          etapa === valor &&
            styles.textoFiltroAtivo,
        ]}
      >
        {titulo}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>
          🏫 Guia de Escolas Públicas
        </Text>

        <Text style={styles.subtitulo}>
          Escolas públicas de Pernambuco
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar por nome, bairro ou município"
        value={busca}
        onChangeText={setBusca}
      />

      <View style={styles.filtros}>
        {renderFiltro("Todos", "Todos")}
        {renderFiltro(
          "Infantil",
          "Educação Infantil"
        )}
        {renderFiltro(
          "Fundamental",
          "Ensino Fundamental"
        )}
        {renderFiltro(
          "Médio",
          "Ensino Médio"
        )}
      </View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() =>
            router.push("/favoritos")
          }
        >
          <Text style={styles.textoMenu}>
            ⭐ Favoritos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoMenu}
          onPress={() =>
            router.push("/sobre")
          }
        >
          <Text style={styles.textoMenu}>
            ℹ️ Sobre
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={escolasFiltradas}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/detalhe",
                params: {
                  ...item,
                },
              })
            }
          >
            <View style={styles.linhaTitulo}>
              <Text style={styles.nome}>
                {item.NO_ENTIDADE}
              </Text>

              {ehFavorita(item.id) && (
                <Text style={styles.coracao}>
                  ❤️
                </Text>
              )}
            </View>

            <Text style={styles.local}>
              📍 {item.NO_BAIRRO} •{" "}
              {item.NO_MUNICIPIO}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>
                🎓 {item.TP_ETAPA_ENSINO}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 50,
    marginBottom: 20,
    alignItems: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1565c0",
  },

  subtitulo: {
    color: "#64748b",
    marginTop: 4,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },

  botaoFiltro: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  botaoFiltroAtivo: {
    backgroundColor: "#1976d2",
  },

  textoFiltro: {
    color: "#1976d2",
    fontWeight: "600",
  },

  textoFiltroAtivo: {
    color: "#fff",
  },

  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  botaoMenu: {
    flex: 1,
    backgroundColor: "#1976d2",
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },

  textoMenu: {
    color: "#fff",
    fontWeight: "bold",
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

  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nome: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    marginRight: 10,
  },

  coracao: {
    fontSize: 20,
  },

  local: {
    color: "#64748b",
    marginTop: 6,
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeTexto: {
    color: "#1565c0",
    fontWeight: "600",
  },
});