import { currencyApi } from "../../config/currencyApi";

export const fetchCurrencyData = async () => {
  const { data } = await currencyApi.get("bank/currency");
  const usdRate = data.find(
    (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
  );
  const eurRate = data.find(
    (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
  );
  return { usdRate, eurRate };
};
