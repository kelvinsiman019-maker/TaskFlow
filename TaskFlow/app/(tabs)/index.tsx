import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>

      {/* Input row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Task list */}
      <View style={styles.taskList}>
        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color="#6B7280"
          />
          <Text style={styles.taskText}>Study React Native</Text>
        </View>

        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color="#6B7280"
          />
          <Text style={styles.taskText}>Finish Assignment</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 12,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: 0.5,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
    marginRight: 10,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  taskList: {
    gap: 4,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 12,
  },
});
