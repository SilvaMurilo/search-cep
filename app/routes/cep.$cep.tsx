import React from "react";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Label } from "@/components/ui/label";
import { useLoaderData } from "@remix-run/react";
import { z } from 'zod';
import { Address } from "@/schemas/addressSchema";

export const loader: LoaderFunction = async ({ params }) => {
  const { cep } = params;
  if (!cep) {
    return redirect("/");
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    if (!response.ok) {
      return json({ error: "Erro ao buscar o CEP" }, { status: 500 });
    }

    const address: Address = await response.json();
    if (address.erro) {
      return json({ error: "CEP não encontrado" }, { status: 404 });
    }

    return json(address);
  } catch (error) {
    return json({ error: "Erro na requisição" }, { status: 500 });
  }
};

export default function CepPage() {
  const data = useLoaderData<Address | { error: string }>();

  if ("error" in data) {
    return (
      <main className="flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:px-16">
        <Label className="text-3xl sm:text-4xl md:text-5xl text-center">
          Erro:
        </Label>
        <div className="flex flex-col p-4 border border-gray-300 rounded w-full max-w-lg">
          <p className="text-red-500">{data.error}</p>
        </div>
      </main>
    );
  }

  const address = data as Address;

  return (
    <main className="flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      <Label className="text-3xl sm:text-4xl md:text-5xl text-center">
        Detalhes do CEP:
      </Label>
      <div className="flex flex-col p-4 border border-gray-300 rounded w-full max-w-lg">
        <div className="mb-4">
          <label className="block font-semibold">CEP:</label>
          <input
            type="text"
            value={address.cep}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Logradouro:</label>
          <input
            type="text"
            value={address.logradouro}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Complemento:</label>
          <input
            type="text"
            value={address.complemento}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Unidade:</label>
          <input
            type="text"
            value={address.unidade}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Bairro:</label>
          <input
            type="text"
            value={address.bairro}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Localidade:</label>
          <input
            type="text"
            value={address.localidade}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">UF:</label>
          <input
            type="text"
            value={address.uf}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">GIA:</label>
          <input
            type="text"
            value={address.gia}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">DDD:</label>
          <input
            type="text"
            value={address.ddd}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">SIAFI:</label>
          <input
            type="text"
            value={address.siafi}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </main>
  );
}
