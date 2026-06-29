import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export default function AddTaskModal({
  visible,
  onClose,
  onSubmit,
}: AddTaskModalProps) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setTitle('');
  };

  const handleClose = () => {
    setTitle('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Backdrop — tap outside to close */}
        <Pressable style={styles.backdrop} onPress={handleClose}>

          {/* Card — prevent tap from closing */}
          <Pressable style={styles.card} onPress={() => {}}>

            <View style={styles.dragHandle} />

            <Text style={styles.heading}>New Task</Text>
            <Text style={styles.subheading}>What do you need to get done?</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter task title…"
              placeholderTextColor="#A3A3A3"
              value={title}
              onChangeText={setTitle}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleAdd}
              maxLength={200}
            />

            <Text style={styles.charCount}>{title.length} / 200</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn]}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btn,
                  styles.addBtn,
                  !title.trim() && styles.addBtnDisabled,
                ]}
                onPress={handleAdd}
                activeOpacity={0.8}
                disabled={!title.trim()}
              >
                <Text style={styles.addText}>Add Task</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 20, 0.55)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E2E2',
    alignSelf: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#FAFAFA',
  },
  charCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  addBtn: {
    backgroundColor: '#2E5BBA',
  },
  addBtnDisabled: {
    backgroundColor: '#A0AEC0',
  },
  addText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});
