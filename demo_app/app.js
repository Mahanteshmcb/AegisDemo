const sensors = [
  { id: 'demo_mycelial_001', type: 'Mycelial Probe', zone: 1, status: 'online', battery: 0.86, latest: 'Healthy biomass detected' },
  { id: 'demo_mycelial_002', type: 'Mycelial Probe', zone: 1, status: 'online', battery: 0.71, latest: 'Nutrient flow stable' },
  { id: 'demo_acoustic_001', type: 'Acoustic Monitor', zone: 2, status: 'online', battery: 0.93, latest: 'Low pest activity' },
  { id: 'demo_acoustic_002', type: 'Acoustic Monitor', zone: 2, status: 'offline', battery: 0.00, latest: 'No signal' },
  { id: 'demo_weather_001', type: 'Environment Station', zone: 3, status: 'online', battery: 0.96, latest: 'Humidity stable' },
  { id: 'demo_soil_001', type: 'Soil Sensor', zone: 3, status: 'online', battery: 0.79, latest: 'Moisture level optimal' },
];

const sensorGrid = document.getElementById('sensor-grid');
const alertList = document.getElementById('alert-list');
const metricSensors = document.getElementById('metric-sensors');
const metricZones = document.getElementById('metric-zones');
const metricAlerts = document.getElementById('metric-alerts');
const metricUptime = document.getElementById('metric-uptime');

const alerts = [
  { message: 'Acoustic monitor detected elevated insect activity', zone: 2, level: 'Warning' },
  { message: 'Sensor battery low in Zone 3', zone: 3, level: 'Alert' },
];

function renderSensors() {
  sensorGrid.innerHTML = sensors.map(sensor => `
    <article class="sensor-card">
      <div class="sensor-header">
        <h3>${sensor.id}</h3>
        <span class="status ${sensor.status === 'online' ? 'online' : 'offline'}">${sensor.status.toUpperCase()}</span>
      </div>
      <p><strong>Type:</strong> ${sensor.type}</p>
      <p><strong>Zone:</strong> ${sensor.zone}</p>
      <p><strong>Battery:</strong> ${Math.round(sensor.battery * 100)}%</p>
      <p><strong>Latest:</strong> ${sensor.latest}</p>
    </article>
  `).join('');
}

function renderAlerts() {
  alertList.innerHTML = alerts.map(alert => `
    <li class="alert-item ${alert.level.toLowerCase()}">
      <strong>${alert.level}</strong> — ${alert.message} <span class="alert-zone">(Zone ${alert.zone})</span>
    </li>
  `).join('');
}

function updateMetrics() {
  metricSensors.textContent = sensors.length;
  metricZones.textContent = [...new Set(sensors.map(sensor => sensor.zone))].length;
  metricAlerts.textContent = alerts.length;
  metricUptime.textContent = `${99 + Math.floor(Math.random() * 2)}.${Math.floor(Math.random() * 100)}%`;
}

function updateDemoData() {
  sensors.forEach(sensor => {
    if (sensor.status === 'offline') return;
    const drain = Math.random() * 0.025;
    sensor.battery = Math.max(0, sensor.battery - drain);
    if (sensor.battery < 0.25) {
      sensor.latest = 'Battery low - schedule recharge';
    }
    if (sensor.battery < 0.10) {
      sensor.status = 'offline';
      alerts.push({ message: `${sensor.type} offline due to battery exhaustion`, zone: sensor.zone, level: 'Critical' });
    }
  });

  if (alerts.length > 0) {
    alerts.splice(0, Math.max(0, alerts.length - 4));
  }

  renderSensors();
  renderAlerts();
  updateMetrics();
}

renderSensors();
renderAlerts();
updateMetrics();
setInterval(updateDemoData, 4000);
