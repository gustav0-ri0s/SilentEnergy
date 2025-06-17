
import React, { useState, useCallback } from 'react';
import InputForm from './components/InputForm';
import CostDisplay from './components/CostDisplay';
import type { ConsumptionInput } from './types';
import { AVERAGE_DAYS_IN_MONTH, CO2_EMISSION_FACTOR_PER_KWH } from './constants';
import { BoltIcon } from './components/icons'; // Using BoltIcon as a general "energy" icon for the header


const App: React.FC = () => {
  const [monthlyCost, setMonthlyCost] = useState<number | null>(null);
  const [monthlyCO2Emissions, setMonthlyCO2Emissions] = useState<number | null>(null);

  const calculateMetrics = useCallback((data: ConsumptionInput) => {
    const { watts, tariff, standbyHours } = data;

    const powerInKW = watts / 1000; // Convert watts to kilowatts
    const dailyEnergyKWh = powerInKW * standbyHours; // kWh per day
    const monthlyEnergyKWh = dailyEnergyKWh * AVERAGE_DAYS_IN_MONTH; // kWh per month
    
    const calculatedMonthlyCost = monthlyEnergyKWh * tariff; // Cost in PEN per month
    setMonthlyCost(calculatedMonthlyCost);

    const calculatedMonthlyCO2 = monthlyEnergyKWh * CO2_EMISSION_FACTOR_PER_KWH; // kg CO2 per month
    setMonthlyCO2Emissions(calculatedMonthlyCO2);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent py-8 px-4 flex flex-col items-center">
      <header className="mb-10 text-center">
        <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-lg mb-4">
           <BoltIcon className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Calculadora de Consumo Fantasma
        </h1>
        <p className="mt-2 text-lg text-blue-100">
          Descubre cuánto te cuesta la energía que tus dispositivos consumen en modo de espera y su impacto ambiental.
        </p>
      </header>

      <main className="w-full max-w-xl">
        <InputForm onSubmit={calculateMetrics} />
        <CostDisplay cost={monthlyCost} co2Emissions={monthlyCO2Emissions} />
      </main>

      <footer className="mt-12 text-center">
        <p className="text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Soluciones Energéticas Modernas. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default App;
