import { useState } from 'react';
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
  // Phase 4.2 — text currently typed into the input box
  const [task, setTask] = useState('');

  // Phase 4.3 — the actual list of tasks (replaces the two static rows)
  const [tasks, setTasks] = useState([]);

  // Phase 4.4 — local-only add handler (Supabase wiring comes in Phase 5)
  function handleAddTask() {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task, completed: false }]);
    setTask('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.taskList}>
        {tasks.map((item) => (
          <View key={item.id} style={styles.taskRow}>
            <MaterialIcons
              name={item.completed ? 'check-box' : 'check-box-outline-blank'}
              size={20}
              color={item.completed ? '#2E5BBA' : '#5A6472'}
            />
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E5BBA',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#D8DCE3',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2E5BBA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    gap: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  taskText: {
    fontSize: 15,
    color: '#1E2532',
  },
});