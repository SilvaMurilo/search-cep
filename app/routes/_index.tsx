import React, { useState } from "react";
import { json, redirect, type ActionFunction } from "@remix-run/node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const meta = () => {
  return [
    { title: "Busca CEP" },
    { name: "description", content: "Busca CEP!" },
  ];
};

// Função de ação para lidar com o envio do formulário
export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const cep = formData.get("cep");
  console.log('CEP recebido:', cep);
  
  if (!cep || cep.length !== 9) {
    return json({ error: "CEP inválido" }, { status: 400 });
  }

  // Redireciona para a rota `/cep/${cep}` para buscar os dados do CEP
  return redirect(`/cep/${cep}`);
};


export default function Index() {
  const [cep, setCep] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    setCep(value);
  };

  return (
    <main className="flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      <Label className="text-3xl sm:text-4xl md:text-5xl text-center">
        Busca CEP:
      </Label>
      <section className="flex flex-col w-full max-w-lg">
        <form method="post" action="/cep" className="flex flex-col gap-4">
          <Label className="text-lg sm:text-xl md:text-2xl">
            Insira seu CEP:
          </Label>
          <Input
            className="text-base sm:text-lg md:text-xl p-2 border rounded w-full"
            type="text"
            name="cep"
            value={cep}
            onChange={handleChange}
            placeholder="12345-678"
            required
          />
          <Button
            className="text-base sm:text-lg md:text-xl mt-4 py-2 px-4 rounded hover:bg-slate-600"
            type="submit"
            disabled={cep.length !== 9} // Desabilita o botão até o CEP estar completo
          >
            Buscar
          </Button>
        </form>
      </section>
    </main>
  );
}
