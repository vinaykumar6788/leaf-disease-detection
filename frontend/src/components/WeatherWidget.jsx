import React from 'react';
import { Thermometer, Droplets, CloudRain, Wind, CloudSun } from 'lucide-react';

const WeatherWidget = ({ weather }) => {
  if (!weather) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 text-center text-xs text-slate-400">
        <CloudSun className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <span>No weather data available.</span>
      </div>
    );
  }

  const temp = weather.temperature !== undefined ? weather.temperature : 28.5;
  const humidity = weather.humidity !== undefined ? weather.humidity : 80;
  const rainfall = weather.rainfall !== undefined ? weather.rainfall : 0;
  const windSpeed = weather.wind_speed !== undefined ? weather.wind_speed : 3.5;
  const description = weather.description || 'Clear';

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-emerald-600" />
          Field Micro-Climate
        </span>
        <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
          {description}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
        {/* Temperature */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-400 mb-1">
            <Thermometer className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[10px] font-semibold uppercase">Temp</span>
          </div>
          <span className="text-base font-extrabold text-slate-800">
            {temp}°C
          </span>
        </div>

        {/* Humidity */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-400 mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[10px] font-semibold uppercase">Humidity</span>
          </div>
          <span className="text-base font-extrabold text-slate-800">
            {humidity}%
          </span>
        </div>

        {/* Rainfall */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-400 mb-1">
            <CloudRain className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-[10px] font-semibold uppercase">Rain (1h)</span>
          </div>
          <span className="text-base font-extrabold text-slate-800">
            {rainfall} mm
          </span>
        </div>

        {/* Wind Speed */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-slate-400 mb-1">
            <Wind className="w-3.5 h-3.5 text-teal-500" />
            <span className="text-[10px] font-semibold uppercase">Wind</span>
          </div>
          <span className="text-base font-extrabold text-slate-800">
            {windSpeed} m/s
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
