import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProjetosRecentes = ({ nomeProjeto, tempoProjeto, statusProjeto, theme }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aprovado':
        return '#28a745';
      case 'Pendente':
        return '#ffc107';
      case 'Reprovado':
        return '#dc3545';
      default:
        return theme.textSecondary;
    }
  };

  return (
    <View style={[styles.container, { borderColor: theme.cardBorder }]}>
      <View style={styles.projectInfo}>
        <Text style={[styles.projectName, { color: theme.text }]}>
          {nomeProjeto}
        </Text>
        <Text style={[styles.projectTime, { color: theme.textSecondary }]}>
          {tempoProjeto}
        </Text>
      </View>
      
      <View style={[styles.statusBadge, { 
        backgroundColor: getStatusColor(statusProjeto) + '20' 
      }]}>
        <Text style={[styles.statusText, { 
          color: getStatusColor(statusProjeto) 
        }]}>
          {statusProjeto}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectTime: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProjetosRecentes;