let expenses = [];

function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const note = document.getElementById('note').value;
  const category = document.getElementById('category').value;

  if (!description || isNaN(amount)) return;

  const expense = {
    id: Date.now(),
    description,
    amount,
    note,
    category
  };

  expenses.push(expense);
  updateUI();

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('note').value = '';
  document.getElementById('category').value = '';
}

function updateUI() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById('total').textContent = total.toFixed(2);

  const history = document.getElementById('history');
  history.innerHTML = '';
  expenses.forEach(e => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div><strong>${e.description}</strong> - ₹${e.amount.toFixed(2)}</div>
      ${e.category ? `<div>Category: ${e.category}</div>` : ''}
      ${e.note ? `<div>Note: ${e.note}</div>` : ''}
    `;
    history.appendChild(div);
  });

  renderChart();
}

let chart;
function renderChart() {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: expenses.map(e => e.description),
      datasets: [{
        label: 'Amount',
        data: expenses.map(e => e.amount),
        borderColor: '#2563eb',
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
