import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const InfoGeralContainer = ({ topico, iconeTopico, pontuacaoGeral, corNumero, comentario, theme }) => {
  /**
   * Define a cor da barra de progresso baseada na pontuação
   */
  const getProgressColor = (pontuacao) => {
    if (pontuacao >= 90) return "#22c55e";
    if (pontuacao >= 70) return "#eab308";
    if (pontuacao >= 50) return "#f97316";
    return "#ef4444";
  };

  /**
   * Define a cor do texto da pontuação baseada na categoria
   */
  const getScoreColor = (cor) => {
    switch (cor) {
      case "success":
        return "#22c55e";
      case "danger":
        return "#ef4444";
      case "warning":
        return "#eab308";
      case "primary":
        return theme.primary;
      default:
        return theme.text;
    }
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: theme.cardBg, 
      borderColor: theme.cardBorder 
    }]}>
      {/* Cabeçalho com título e ícone */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{topico}</Text>
        <Ionicons name={iconeTopico} size={20} color={theme.textSecondary} />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Pontuação destacada */}
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: getScoreColor(corNumero) }]}>
            {pontuacaoGeral}%
          </Text>
        </View>

        {/* Barra de progresso */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBackground, { backgroundColor: theme.inputBorder }]}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${pontuacaoGeral}%`,
                  backgroundColor: getProgressColor(pontuacaoGeral),
                }
              ]}
            />
          </View>
        </View>

        {/* Comentário descritivo */}
        <Text style={[styles.comment, { color: theme.textSecondary }]}>
          {comentario}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBackground: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  comment: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
});