
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartBarIcon, LeafIcon } from './icons'; // Import LeafIcon

interface CostDisplayProps {
  cost: number | null;
  co2Emissions: number | null; // Added co2Emissions prop
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost, co2Emissions }) => {
  if (cost === null || co2Emissions === null) {
    return (
      <div className="mt-8 p-6 bg-white rounded-xl shadow-xl text-center">
        <p className="text-lg text-gray-600">Ingrese los datos para calcular el costo mensual y la huella de carbono.</p>
      </div>
    );
  }

  const formattedCost = cost.toFixed(2);
  const formattedCO2 = co2Emissions.toFixed(2);
  const chartData = [{ name: 'Costo Mensual', 'Costo (PEN)': parseFloat(formattedCost) }];

  return (
    <div className="mt-8 p-8 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">Impacto Mensual Estimado</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-2 text-center">Costo del Consumo Fantasma</h3>
        <div className="flex items-center justify-center text-5xl font-bold text-primary mb-1">
          <span className="mr-2">S/</span>{formattedCost}
        </div>
        <p className="text-sm text-gray-500 text-center">al mes</p>
      </div>

      <hr className="my-6 border-gray-200" />
      
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-2 text-center flex items-center justify-center">
          <LeafIcon className="h-6 w-6 mr-2 text-green-600" />
          Huella de Carbono
        </h3>
        <div className="flex items-center justify-center text-4xl font-bold text-green-700 mb-1">
          {formattedCO2}
          <span className="text-2xl font-medium ml-2">kg CO₂eq</span>
        </div>
        <p className="text-sm text-gray-500 text-center">al mes</p>
      </div>
      
      {cost > 0 && (
        <div className="mt-6">
           <hr className="my-6 border-gray-200" />
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center justify-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-accent" />
            Visualización del Costo Monetario
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{
                  top: 20, right: 30, left: 0, bottom: 5,
                }}
                accessibilityLayer
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" PEN" domain={[0, 'dataMax + 10']}/>
                <Tooltip formatter={(value: number) => [`S/ ${value.toFixed(2)}`, "Costo"]}/>
                <Legend />
                <Bar dataKey="Costo (PEN)" fill="#3B82F6" barSize={60} radius={[4, 4, 0, 0]} aria-label="Barra de costo mensual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {(cost === 0 || co2Emissions === 0) && (
         <p className="text-md text-gray-600 text-center mt-4">El costo y/o la huella de carbono calculados son cero. ¡Buen trabajo ahorrando energía y reduciendo emisiones!</p>
      )}
       <p className="text-xs text-gray-500 text-center mt-8">
        Estos son valores estimados. El consumo e impacto real pueden variar.
      </p>
      <p className="text-xs text-gray-500 text-center mt-4">
        Debido a la electricidad utilizada por ese dispositivo (aunque esté en modo de espera), se liberan al ambiente gases de efecto invernadero equivalentes a {formattedCO2} kg de CO₂. Esto es lo que contribuye al calentamiento global y al cambio climático.
      </p>
    </div>
  );
};

export default CostDisplay;
