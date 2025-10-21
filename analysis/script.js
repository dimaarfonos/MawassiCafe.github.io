const monthlyData = [
  {
    month: "Январь",
    visitors: 1830,
    newVisitors: 620,
    avgDuration: 3.8,
    bounceRate: 0.41,
    orders: 86,
  },
  {
    month: "Февраль",
    visitors: 1970,
    newVisitors: 740,
    avgDuration: 4.1,
    bounceRate: 0.38,
    orders: 95,
  },
  {
    month: "Март",
    visitors: 2215,
    newVisitors: 810,
    avgDuration: 4.4,
    bounceRate: 0.35,
    orders: 122,
  },
  {
    month: "Апрель",
    visitors: 2550,
    newVisitors: 980,
    avgDuration: 5.2,
    bounceRate: 0.29,
    orders: 160,
  },
  {
    month: "Май",
    visitors: 2735,
    newVisitors: 1020,
    avgDuration: 5.6,
    bounceRate: 0.26,
    orders: 181,
  },
];

const formatPercent = (value) => `${(value * 100).toFixed(1)}%`;
const formatMinutes = (value) => `${value.toFixed(1)} мин`;
const formatNumber = (value) => value.toLocaleString("ru-RU");

function renderKpi() {
  const totalVisitors = monthlyData.reduce((acc, { visitors }) => acc + visitors, 0);
  const avgDuration =
    monthlyData.reduce((acc, { avgDuration }) => acc + avgDuration, 0) /
    monthlyData.length;
  const avgBounceRate =
    monthlyData.reduce((acc, { bounceRate }) => acc + bounceRate, 0) /
    monthlyData.length;
  const totalOrders = monthlyData.reduce((acc, { orders }) => acc + orders, 0);
  const conversionRate = totalOrders / totalVisitors;

  document.getElementById("totalVisitors").textContent = formatNumber(totalVisitors);
  document.getElementById("avgDuration").textContent = formatMinutes(avgDuration);
  document.getElementById("avgBounce").textContent = formatPercent(avgBounceRate);
  document.getElementById("conversionRate").textContent = formatPercent(conversionRate);
}

function renderTable() {
  const tbody = document.getElementById("monthlyBody");
  const bestMonth = monthlyData.reduce((best, current) =>
    current.orders > best.orders ? current : best
  );

  monthlyData.forEach((row) => {
    const tr = document.createElement("tr");

    if (row.month === bestMonth.month) {
      tr.classList.add("highlight");
    }

    tr.innerHTML = `
      <td>${row.month}</td>
      <td>${formatNumber(row.visitors)}</td>
      <td>${formatNumber(row.newVisitors)}</td>
      <td>${row.avgDuration.toFixed(1)}</td>
      <td>${formatPercent(row.bounceRate)}</td>
      <td>${row.orders}</td>
    `;

    tbody.appendChild(tr);
  });
}

function renderInsights() {
  const list = document.getElementById("insightList");
  const insights = [
    "Рост посещаемости стабилен — средний прирост составляет 12% месяц к месяцу.",
    "Среднее время на сайте превышает 5 минут к маю, что говорит о вовлечённости аудитории.",
    "Показатель отказов снизился на 15 процентных пунктов с января, оптимизация меню и фото работает.",
    "Май демонстрирует лучшую конверсию за счёт запуска промо-кампаний и обновления онлайн-меню.",
  ];

  insights.forEach((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderKpi();
  renderTable();
  renderInsights();
});
