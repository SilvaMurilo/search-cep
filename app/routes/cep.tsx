import React from "react";
import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Label } from "@/components/ui/label";
import { AddressSchema, Address } from "@/schemas/addressSchema";

export const action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const cep = formData.get("cep");

  if (!cep || cep.length !== 9) {
    return json({ error: "CEP inválido" }, { status: 400 });
  }

  return redirect(`/cep/${cep}`);
};

export const loader: LoaderFunction = async ({ params }) => {
  const { cep } = params;
  if (!cep) {
    return redirect("/");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
  if (!response.ok) {
    return json({ error: "Erro ao buscar o CEP" }, { status: 500 });
  }
  const addressData = await response.json();
  const parsedAddress = AddressSchema.safeParse(addressData);
  if (!parsedAddress.success) {
    return json({ error: "Dados de CEP inválidos" }, { status: 500 });
  }

  return json(parsedAddress.data);
};

export default function CepPage() {
  const address = useLoaderData<Address>();

  return (
    <main className="flex flex-col gap-10 items-center justify-center px-4 py-8 sm:px-8 md:px-12 lg:px-16">
      <Label className="text-3xl sm:text-4xl md:text-5xl text-center">
        Detalhes do CEP:
      </Label>
      <Link to="/" className="text-xl text-blue-500 hover:underline mb-4">
        Nova Busca
      </Link>
      <div className="flex flex-col p-4 border border-gray-300 rounded w-full max-w-lg">
        {address && (
          <>
            <div className="mb-4">
              <Label className="block font-semibold">CEP:</Label>
              <input
                type="text"
                value={address.cep}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">Logradouro:</Label>
              <input
                type="text"
                value={address.logradouro}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">Bairro:</Label>
              <input
                type="text"
                value={address.bairro}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">Complemento:</Label>
              <input
                type="text"
                value={address.complemento || "N/A"}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">Localidade:</Label>
              <input
                type="text"
                value={address.localidade}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">UF:</Label>
              <input
                type="text"
                value={address.uf}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">DDD:</Label>
              <input
                type="text"
                value={address.ddd}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">IBGE:</Label>
              <input
                type="text"
                value={address.ibge}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">Unidade:</Label>
              <input
                type="text"
                value={address.unidade || "N/A"}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">GIA:</Label>
              <input
                type="text"
                value={address.gia || "N/A"}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <Label className="block font-semibold">SIAFI:</Label>
              <input
                type="text"
                value={address.siafi || "N/A"}
                readOnly
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
