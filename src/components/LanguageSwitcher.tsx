"use client";
import React from "react";
import { Select } from "antd";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (value: string) => {
    const segments = pathname.split("/");
    segments[1] = value;
    const newPath = segments.join("/");
    router.push(newPath);
  };
  return (
    <Select
      defaultValue={locale}
      style={{ width: 120 }}
      onChange={onChange}
      options={[
        { value: "en", label: "English" },
        { value: "th", label: "ไทย" },
      ]}
    />
  );
}
