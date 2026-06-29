import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import AddTaskModal from "./AddTaskModal";

// ---- TYPE ----
type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // ---- READ ----
  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error loading tasks:", error.message);
      setLoading(false);
      return;
    }

    setTasks((data as Task[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  // ---- CREATE ----
  async function addTask(title: string) {
    const { error } = await supabase
      .from("tasks")
      .insert([{ title, completed: false }]);

    if (error) {
      console.log("Error adding task:", error.message);
      return;
    }

    loadTasks();
  }

  // ---- TOGGLE COMPLETE ----
  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from("tasks")
      .update({ completed: !item.completed })
      .eq("id", item.id);

    if (error) {
      console.log("Error updating task:", error.message);
      return;
    }

    loadTasks();
  }

  // ---- DELETE ----
  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.log("Error deleting task:", error.message);
      return;
    }

    loadTasks();
  }

  // ---- RENDER ----
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TaskFlow</Text>
        <Text style={styles.headerCount}>
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </Text>
      </View>

      {/* Task list / empty state */}
      {loading ? (
        <Text style={styles.emptyText}>Loading tasks…</Text>
      ) : tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons
            name="check-circle-outline"
            size={48}
            color="#D1D5DB"
          />
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
          <Text style={styles.hintText}>
            Tap to complete • Long-press to delete
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item: Task) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }: { item: Task }) => (
            <TouchableOpacity
              onPress={() => toggleTask(item)}
              onLongPress={() => deleteTask(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.taskRow}>
                <MaterialIcons
                  name={
                    item.completed ? "check-box" : "check-box-outline-blank"
                  }
                  size={22}
                  color={item.completed ? "#4F46E5" : "#9CA3AF"}
                />
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.taskTextCompleted,
                  ]}
                >
                  {item.title}
                </Text>
                <MaterialIcons
                  name="chevron-right"
                  size={18}
                  color="#E5E7EB"
                  style={styles.chevron}
                />
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <Text style={styles.hintText}>
              Tap to complete • Long-press to delete
            </Text>
          }
        />
      )}

      {/* Floating action button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(text) => {
          addTask(text);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: -0.5,
  },
  headerCount: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },

  /* List */
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // room for FAB
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E5EA",
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1F2937",
  },
  taskTextCompleted: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  chevron: {
    marginLeft: 4,
  },

  /* Empty state */
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
    gap: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 14,
    marginTop: 8,
  },
  hintText: {
    textAlign: "center",
    color: "#C4C9D4",
    fontSize: 12,
    paddingVertical: 12,
  },

  /* FAB */
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});
