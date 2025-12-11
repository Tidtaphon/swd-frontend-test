"use client";

// import Image from "next/image";
// import styles from "./page.module.css";
import styles from "../scss/page.module.scss";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Homepage");
  const locale = useLocale();

  const items = [
    {
      title: t("test1"),
      des: t("des1"),
      link: `${locale}/custom-layout`,
    },
    // {
    //   title: t("test2"),
    //   des: t("des2"),
    //   link: "",
    // },
    {
      title: t("test3"),
      des: t("des3"),
      link: `${locale}/form-local-storage`,
    },
  ];
  return (
    <div className={styles["page"]}>
      <div className={styles["page-content"]}>
        {items.map((item: any, index: number) => (
          <a
            key={index}
            href={item.link}
            className={styles["page-content-layout"]}
          >
            <div>{item.title}</div>
            <div>{item.des}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
