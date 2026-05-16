import React, { useRef } from 'react'; // useRef para focar nos campos
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { footballSchema, FootballData } from './src/schemas/userSchema';

export default function App() {
  // NÍVEL 2: Refs para controlar o foco do teclado
  const emailRef = useRef<TextInput>(null);
  const positionRef = useRef<TextInput>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<FootballData>({
    resolver: zodResolver(footballSchema),
    mode: 'onChange' // NÍVEL 2: Valida enquanto o usuário digita
  });

  const onSubmit = (data: FootballData) => {
    Alert.alert("Inscrição Realizada!", `O craque ${data.name} foi escalado.`);
  };

  return (
    // NÍVEL 2: Evita que o teclado cubra o formulário
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>⚽</Text>
          <Text style={styles.title}>Recrutamento FC</Text>
          <Text style={styles.subtitle}>Preencha os dados do jogador</Text>
        </View>

        {/* CAMPO: NOME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Jogador</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Ex: Neymar Jr"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next" // NÍVEL 2: Teclado mostra "Próximo"
                onSubmitEditing={() => emailRef.current?.focus()} // NÍVEL 2: Pula para o próximo
              />
            )}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        {/* CAMPO: E-MAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail de Contato</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={emailRef} // NÍVEL 2: Referência para foco
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="email@clube.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => positionRef.current?.focus()}
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        {/* CAMPO: POSIÇÃO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Posição em Campo</Text>
          <Controller
            control={control}
            name="position"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={positionRef}
                style={[styles.input, errors.position && styles.inputError]}
                placeholder="Ex: Ponta Esquerda"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="send" // NÍVEL 2: Teclado mostra "Enviar"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
          {errors.position && <Text style={styles.errorText}>{errors.position.message}</Text>}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>ESCALAR JOGADOR</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, backgroundColor: '#0F172A' },
  header: { alignItems: 'center', marginBottom: 32 },
  emoji: { fontSize: 50 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#F8FAFC' },
  subtitle: { fontSize: 16, color: '#94A3B8' },
  inputGroup: { marginBottom: 16, width: '100%' },
  label: { color: '#F8FAFC', marginBottom: 8, fontWeight: '500' },
  input: { 
    backgroundColor: '#1E293B', 
    color: '#F8FAFC', 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  button: { 
    backgroundColor: '#22C55E', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: { color: '#052E16', fontWeight: 'bold', fontSize: 16 }
});