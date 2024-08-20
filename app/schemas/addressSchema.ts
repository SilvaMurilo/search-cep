import { z } from "zod";

export const AddressSchema = z.object({
    cep: z.string(),
    logradouro: z.string(),
    complemento: z.string().optional(),
    bairro: z.string(),
    localidade: z.string(),
    uf: z.string(),
    ddd: z.string(),
    ibge: z.string(),
    unidade: z.string().optional(),
    gia: z.string().optional(),
    siafi: z.string().optional(),
  });
  
  export type Address = z.infer<typeof AddressSchema>;