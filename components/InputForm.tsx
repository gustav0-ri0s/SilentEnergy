
import React, { useState } from 'react';
import type { ConsumptionInput } from '../types';
import { BoltIcon, CurrencyDollarIcon, ClockIcon, CalculatorIcon } from './icons';

interface InputFormProps {
  onSubmit: (data: ConsumptionInput) => void;
}

// Define InputField outside of InputForm
const InputField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  unit: string;
  icon: React.ReactNode;
  type?: string;
  min?: string;
  max?: string; // Added max prop
  step?: string;
  'aria-describedby'?: string;
}> = ({ id, label, value, onChange, placeholder, unit, icon, type = "number", min, max, step, 'aria-describedby': ariaDescribedby }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
        {icon}
      </div>
      <input
        type={type}
        name={id}
        id={id}
        className="focus:ring-primary focus:border-primary block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md py-3"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max} // Pass max prop to input
        step={step}
        aria-describedby={ariaDescribedby}
        aria-label={label}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
        <span className="text-gray-500 sm:text-sm">{unit}</span>
      </div>
    </div>
  </div>
);

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [watts, setWatts] = useState<string>('');
  const [tariff, setTariff] = useState<string>('0.8255'); // Set default tariff value
  const [standbyHours, setStandbyHours] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const numWatts = parseFloat(watts);
    const numTariff = parseFloat(tariff);
    const numStandbyHours = parseFloat(standbyHours);

    let currentError = null;

    if (isNaN(numWatts) || numWatts <= 0) {
      currentError = 'El consumo en vatios debe ser un número positivo.';
    } else if (isNaN(numTariff) || numTariff <= 0) {
      currentError = 'La tarifa eléctrica debe ser un número positivo.';
    } else if (isNaN(numStandbyHours) || numStandbyHours <= 0 || numStandbyHours > 24) {
      currentError = 'El tiempo en espera debe ser un número positivo entre 0 y 24 horas.';
    }
    
    setError(currentError);

    if (!currentError) {
      onSubmit({ watts: numWatts, tariff: numTariff, standbyHours: numStandbyHours });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
      <InputField
        id="watts"
        label="Consumo del Dispositivo en Espera"
        value={watts}
        onChange={setWatts}
        placeholder="Ej: 5"
        unit="Vatios (W)"
        icon={<BoltIcon className="h-5 w-5 text-gray-400" />}
        min="0.01"
        step="any"
        aria-describedby="watts-error"
      />
      <InputField
        id="tariff"
        label="Tarifa Eléctrica Actual"
        value={tariff}
        onChange={setTariff}
        placeholder="Ej: 0.50"
        unit="PEN/kWh"
        icon={<CurrencyDollarIcon className="h-5 w-5 text-gray-400" />}
        min="0.01"
        step="any"
        aria-describedby="tariff-error"
      />
      <InputField
        id="standbyHours"
        label="Tiempo Promedio en Espera Diario"
        value={standbyHours}
        onChange={setStandbyHours}
        placeholder="Ej: 20"
        unit="Horas/día"
        icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
        min="0.01"
        max="24"
        step="any"
        aria-describedby="standbyHours-error"
      />
      
      {error && <p id="form-error" className="text-sm text-red-600" role="alert">{error}</p>}

      <button
        type="submit"
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-150"
        aria-label="Calcular costo mensual de consumo fantasma"
      >
        <CalculatorIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Calcular Costo Mensual
      </button>
    </form>
  );
};

export default InputForm;
