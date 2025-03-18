"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useState, useTransition } from "react";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { Select } from "antd";
import { routing } from "@/src/i18n/routing";

export default function LocaleSwitcherSelect() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const params = useParams();
  const defaultValue = useLocale();
  const [value, setValue] = useState(defaultValue);
  function onSelectChange(nextLocale: any) {
    console.log(nextLocale, "nextLocale");
    startTransition(() => {
      setValue(nextLocale);
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }
  console.log(value, "defaultValue");
  return (
    <Select
      value={value}
      disabled={isPending}
      onChange={onSelectChange}
      options={routing.locales.map((item) => {
        return {
          label: item,
          value: item,
        };
      })}
    />
  );
}
