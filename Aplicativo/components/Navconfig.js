import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Navconfig = ({ onItemClick, theme }) => {
  const [activeItem, setActiveItem] = useState("perfil");
  const [showAllItems, setShowAllItems] = useState(false);

  const handleItemClick = (item) => {
    setActiveItem(item);
    onItemClick(item);
    setShowAllItems(false);
  };

  const menuItems = [
    { key: 'perfil', icon: 'person-outline', label: 'Perfil' },
    { key: 'seguranca', icon: 'lock-closed-outline', label: 'Segurança' },
    { key: 'notificacoes', icon: 'notifications-outline', label: 'Notificações' },
    { key: 'assinatura', icon: 'card-outline', label: 'Assinatura' },
  ];

  const renderMenuItem = (item) => (
    <Pressable
      key={item.key}
      style={({ pressed }) => [
        styles.menuItem,
        activeItem === item.key && [styles.activeItem, { backgroundColor: theme.primary }],
        { opacity: pressed ? 0.8 : 1 }
      ]}
      onPress={() => handleItemClick(item.key)}
    >
      <Ionicons 
        name={item.icon} 
        size={20} 
        color={activeItem === item.key ? '#ffffff' : theme.textSecondary} 
      />
      <Text style={[
        styles.menuText, 
        { color: activeItem === item.key ? '#ffffff' : theme.text }
      ]}>
        {item.label}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Menu para mobile com toggle */}
      <View style={[styles.mobileMenu, { backgroundColor: theme.inputBg }]}>
        <View style={[styles.selectedItem, { backgroundColor: '#ffffff' }]}>
          <Ionicons 
            name={menuItems.find(item => item.key === activeItem)?.icon} 
            size={20} 
            color={theme.text} 
          />
          <Text style={[styles.selectedText, { color: theme.text }]}>
            {menuItems.find(item => item.key === activeItem)?.label}
          </Text>
        </View>
        <Pressable
          style={[styles.toggleButton, { borderColor: theme.cardBorder }]}
          onPress={() => setShowAllItems(!showAllItems)}
        >
          <Ionicons 
            name={showAllItems ? "close" : "menu"} 
            size={20} 
            color={theme.textSecondary} 
          />
        </Pressable>
      </View>

      {/* Dropdown menu para mobile */}
      {showAllItems && (
        <View style={[styles.dropdown, { backgroundColor: theme.cardBg, borderColor: theme.cardBorder }]}>
          {menuItems.map(renderMenuItem)}
        </View>
      )}
    </View>
  );
};

export default Navconfig;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  
  // Mobile Menu
  mobileMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 12,
    // Só mostra em telas pequenas - você pode usar um hook de dimensões para isso
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    marginLeft: 8,
    fontWeight: '600',
  },
  toggleButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },

  // Dropdown
  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  // Desktop Menu
  desktopMenu: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    // Esconde em telas pequenas - implemente conforme necessário
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  activeItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    marginLeft: 8,
    fontWeight: '600',
  },
});