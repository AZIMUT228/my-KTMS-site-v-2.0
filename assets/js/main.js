
document.addEventListener("DOMContentLoaded", () => {
  initFaq();
  initCalculator();
});
function initFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => item.classList.toggle("active"));
  });
}
function initCalculator() {
  const vehiclesEl = document.getElementById("vehicles");
  const fuelEl = document.getElementById("fuel");
  const lossEl = document.getElementById("loss");
  if (!vehiclesEl || !fuelEl || !lossEl) return;
  const updateCalc = () => {
    const vehicles = Number(vehiclesEl.value || 0);
    const fuel = Number(fuelEl.value || 0);
    const loss = Number(lossEl.value || 0);
    const saving = fuel * (loss / 100);
    const perVehicle = vehicles > 0 ? Math.round(saving / vehicles) : 0;
    const savingValue = document.getElementById("savingValue");
    const savingDetails = document.getElementById("savingDetails");
    const economyText = document.getElementById("economyText");
    if (savingValue) savingValue.textContent = Math.round(saving).toLocaleString("uk-UA") + " грн";
    if (savingDetails) savingDetails.textContent = `При ${vehicles} од. транспорту і витратах ${fuel.toLocaleString("uk-UA")} грн на місяць.`;
    if (economyText) economyText.textContent = `Оцінка прихованих втрат — ${loss}%. Це приблизно ${Math.round(saving).toLocaleString("uk-UA")} грн на місяць або ~${perVehicle.toLocaleString("uk-UA")} грн на одну одиницю транспорту.`;
  };
  vehiclesEl.addEventListener("input", updateCalc);
  fuelEl.addEventListener("input", updateCalc);
  lossEl.addEventListener("change", updateCalc);
  updateCalc();
}
function sendEstimate() {
  const get = (id) => document.getElementById(id)?.value || "";
  const calcSuccess = document.getElementById("calcSuccess");
  const savingText = document.getElementById("savingValue")?.textContent || "";
  if (calcSuccess) calcSuccess.style.display = "block";
  const body = `Добрий день.
Хочу отримати розрахунок рішення по GPS моніторингу і контролю пального.

Ім’я: ${get("leadName")}
Контакт: ${get("leadPhone")}
Кількість транспорту: ${get("vehicles")}
Витрати на пальне в місяць: ${get("fuel")} грн
Оцінка прихованих втрат: ${get("loss")}%
Потенційна економія: ${savingText}

Прошу зв’язатися зі мною і запропонувати рішення.`;
  const mailto = `mailto:kc@ktsm.com.ua?subject=${encodeURIComponent("Запит розрахунку рішення")}&body=${encodeURIComponent(body)}`;
  setTimeout(() => { window.location.href = mailto; }, 300);
}
function sendLead() {
  const get = (id) => document.getElementById(id)?.value.trim() || "";
  const success = document.getElementById("successBox");
  const error = document.getElementById("errorBox");
  if (success) success.style.display = "none";
  if (error) error.style.display = "none";
  if (!get("name") || !get("phone")) {
    if (error) error.style.display = "block";
    return;
  }
  const body = `Добрий день.
Хочу отримати пропозицію по впровадженню рішення.

Ім’я: ${get("name")}
Компанія: ${get("company")}
Контакт: ${get("phone")}
Кількість транспорту: ${get("fleet")}
Задача: ${get("message")}`;
  const mailto = `mailto:kc@ktsm.com.ua?subject=${encodeURIComponent("Нова заявка з сайту")}&body=${encodeURIComponent(body)}`;
  if (success) success.style.display = "block";
  window.location.href = mailto;
}
