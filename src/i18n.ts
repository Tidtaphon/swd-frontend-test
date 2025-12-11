import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "th"];

export default getRequestConfig(async ({ locale }) => {
  // console.log("locale >>>>", locale);
  const finalLocale = locales.includes(locale ?? "") ? locale : "en";

  // console.log("finalLocale >>>>", finalLocale);

  return {
    locale: finalLocale as string,
    messages: (await import(`./messages/${finalLocale}.json`)).default,
  };
});
