import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProjetosRecentes = ({ nomeProjeto, tempoProjeto, statusProjeto, theme }) => {
  /**
   * Define a cor do badge baseada no status
   */
  const getBadgeStyle = (status) => {
    const baseStyle = {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
    };

    switch (status.toLowerCase()) {
      case "aprovado":
        return {
          ...baseStyle,
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          borderColor: "rgba(34, 197, 94, 0.3)",
        };
      case "pendente":
        return {
          ...baseStyle,
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          borderColor: "rgba(251, 191, 36, 0.3)",
        };
      case "rejeitado":
        return {
          ...baseStyle,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderColor: "rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.inputBg,
          borderColor: theme.inputBorder,
        };
    }
  };

  const getBadgeTextColor = (status) => {
    switch (status.toLowerCase()) {
      case "aprovado":
        return "#16a34a";
      case "pendente":
        return "#d97706";
      case "rejeitado":
        return "#dc2626";
      default:
        return theme.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.inputBg, 
      borderColor: theme.inputBorder 
    }]}>
      {/* Informações do projeto */}
      <View style={styles.projectInfo}>
        <Text style={[styles.projectName, { color: theme.text }]}>
          {nomeProjeto}
        </Text>
        <Text style={[styles.projectTime, { color: theme.textSecondary }]}>
          {tempoProjeto}
        </Text>
      </View>

      {/* Badge de status */}
      <View style={getBadgeStyle(statusProjeto)}>
        <Text style={[styles.badgeText, { color: getBadgeTextColor(statusProjeto) }]}>
          {statusProjeto}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  projectTime: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
});