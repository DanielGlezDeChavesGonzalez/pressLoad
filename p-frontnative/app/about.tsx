import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function About() {
  return (
    <ScrollView>
      <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }}>
        <Text style={styles.text}>
          En PressLoad, valoramos y protegemos la privacidad de nuestros
          usuarios. Nos comprometemos a garantizar que sus datos personales sean
          tratados con la máxima seguridad y en estricto cumplimiento de las
          normativas de protección de datos aplicables, incluyendo el Reglamento
          General de Protección de Datos (GDPR) de la Unión Europea y cualquier
          legislación local pertinente. A continuación, describimos cómo
          recopilamos, utilizamos, almacenamos y protegemos su información
          personal al utilizar nuestra aplicación.{"\n\n"}
        </Text>
        <Text style={styles.text}>
          Política de Privacidad y Protección de Datos de PressLoad{"\n\n"}
          En PressLoad, valoramos y protegemos la privacidad de nuestros
          usuarios.
          {"\n\n"}
          1. Recopilación y Uso de Datos{"\n"}
          PressLoad recopila información personal proporcionada directamente por
          el usuario...{"\n\n"}
        </Text>
        <Text style={styles.text}>
          En PressLoad, valoramos y protegemos la privacidad de nuestros
          usuarios. Nos comprometemos a garantizar que sus datos personales sean
          tratados con la máxima seguridad y en estricto cumplimiento de las
          normativas de protección de datos aplicables, incluyendo el Reglamento
          General de Protección de Datos (GDPR) de la Unión Europea y cualquier
          legislación local pertinente. A continuación, describimos cómo
          recopilamos, utilizamos, almacenamos y protegemos su información
          personal al utilizar nuestra aplicación.{"\n\n"}
        </Text>
        <Text style={styles.text}>
          En PressLoad, valoramos y protegemos la privacidad de nuestros
          usuarios. Nos comprometemos a garantizar que sus datos personales sean
          tratados con la máxima seguridad y en estricto cumplimiento de las
          normativas de protección de datos aplicables, incluyendo el Reglamento
          General de Protección de Datos (GDPR) de la Unión Europea y cualquier
          legislación local pertinente. A continuación, describimos cómo
          recopilamos, utilizamos, almacenamos y protegemos su información
          personal al utilizar nuestra aplicación.{"\n\n"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
