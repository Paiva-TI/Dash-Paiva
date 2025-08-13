"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLngTuple } from "leaflet";

const estados: {
  nome: string;
  coordenadas: LatLngTuple;
  dados: { id: number; veiculo: string; status: string }[];
}[] = [
  {
    nome: "Bahia",
    coordenadas: [-12.9704, -38.5124],
    dados: [
      { id: 1, veiculo: "Caminhão A", status: "Ativo" },
      { id: 2, veiculo: "Carro B", status: "Em movimento" },
    ],
  },
  {
    nome: "Piauí",
    coordenadas: [-5.0892, -42.8016],
    dados: [
      { id: 3, veiculo: "Moto C", status: "Parado" },
      { id: 4, veiculo: "Carro D", status: "Em manutenção" },
    ],
  },
];

const ChangeMapView = ({ coords }: { coords: LatLngTuple }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 6);
  }, [coords, map]);
  return null;
};

export default function Dashboard() {
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtual((prev) => (prev + 1) % estados.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  const estado = estados[indiceAtual];

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2 h-[400px] rounded-2xl overflow-hidden shadow">
        <MapContainer
          center={estado.coordenadas}
          zoom={6}
          scrollWheelZoom={false}
          style={{ zIndex: 0 }}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
          <ChangeMapView coords={estado.coordenadas} />
          <Marker position={estado.coordenadas}>
            <Popup>
              Veículos localizados em <strong>{estado.nome}</strong>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="w-full md:w-1/3">
        <h2 className="text-xl font-bold mb-2">{estado.nome}</h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Veículo</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {estado.dados.map((item) => (
              <tr key={item.id}>
                <td className="border px-2 py-1 text-center">{item.id}</td>
                <td className="border px-2 py-1">{item.veiculo}</td>
                <td className="border px-2 py-1">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
