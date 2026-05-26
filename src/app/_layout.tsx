import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1565c0",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "🏫 Guia de Escolas",
        }}
      />

      <Stack.Screen
        name="detalhe"
        options={{
          title: "Detalhes da Escola",
        }}
      />

      <Stack.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
        }}
      />

      <Stack.Screen
        name="sobre"
        options={{
          title: "Sobre",
        }}
      />
    </Stack>
  );
}