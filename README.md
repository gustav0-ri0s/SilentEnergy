
# 💡 Calculadora de Consumo Fantasma

Este proyecto es una **calculadora web interactiva** desarrollada para estimar el consumo eléctrico de dispositivos en **modo de espera** (standby), también conocido como **consumo fantasma**, y su impacto económico y ambiental.

## 🧠 ¿Qué es el consumo fantasma?

El consumo fantasma es la energía que consumen los electrodomésticos y equipos electrónicos incluso cuando están apagados, pero conectados a la corriente. Este consumo silencioso representa un gasto innecesario que afecta tanto a tu bolsillo como al medio ambiente.

## 🛠 Proyecto complementario con Arduino

Este aplicativo fue desarrollado como parte de un proyecto mayor que utiliza **Arduino** para medir directamente el consumo fantasma de diversos dispositivos en tiempo real. La información recopilada se utiliza como entrada en la calculadora web.

## 🌐 Funcionalidades de la calculadora

- Ingresar el consumo fantasma del equipo (en vatios), obtenido desde el medidor con Arduino.
- Ingresar la tarifa por kWh según tu recibo eléctrico local.
- Indicar cuántas **horas por día** el dispositivo permanece enchufado en modo de espera.
- Obtener:
  - El costo mensual del consumo fantasma en **soles** o **dólares**.
  - La **huella de carbono estimada** (kg CO₂eq).
  - Visualización gráfica del impacto.

## 📈 ¿Cómo se calcula?

1. **Energía consumida (kWh)** = (Consumo en vatios × Horas por día × 30 días) ÷ 1000  
2. **Costo mensual (S/.)** = Energía consumida × Tarifa eléctrica  
3. **Huella de carbono** = Energía consumida × Factor de emisión (por defecto: 0.23314 kg CO₂/kWh)

## 🌱 Concientización ambiental

Además del cálculo económico, la aplicación brinda una **reflexión ambiental** basada en la huella de carbono estimada. Esto busca **generar conciencia sobre el impacto ecológico del uso innecesario de energía**.

## 🚀 Tecnologías utilizadas

- HTML, CSS, JavaScript
- [Opcional: Framework o librería si usaste alguna]
- Integración con datos obtenidos desde sensores mediante Arduino

## 📸 Capturas

[Agregar aquí una o más imágenes del aplicativo]

## 🧪 Cómo probarlo

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/consumo-fantasma-calculadora.git
   ```

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


4. Abre el archivo `index.html` en tu navegador.

## Deploy
https://silent-energy.vercel.app/

## 🤝 Contribuciones

¡Bienvenidas las ideas, mejoras o reportes de bugs! Puedes hacer un fork o abrir un *issue* directamente desde GitHub.

---

> ⚡ Cada pequeño gesto cuenta. Desenchufa, ahorra y cuida el planeta.
