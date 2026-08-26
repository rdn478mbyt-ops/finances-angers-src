const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurExact = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const eurM = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function formatEuros(value: number, exact = false) {
  return exact ? eurExact.format(value) : eur.format(value);
}

export function formatMillions(value: number) {
  return `${eurM.format(value / 1_000_000)}\u00a0M€`;
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}\u00a0%`;
}

export function formatYears(value: number) {
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}\u00a0ans`;
}
