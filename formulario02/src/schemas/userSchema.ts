import { z } from 'zod';

// Este objeto define as regras do seu formulário
export const footballSchema = z.object({
  name: z
    .string()
    .min(3, "O nome do craque deve ter pelo menos 3 letras"),
    
  email: z
    .string()
    .email("E-mail de contato inválido"),
    
  position: z
    .string()
    .min(2, "Informe a posição (ex: Meia, Atacante)"),
});

// Isso aqui cria um "Tipo" para o TypeScript baseado no esquema acima
// Ajuda a evitar erros de digitação no código
export type FootballData = z.infer<typeof footballSchema>;