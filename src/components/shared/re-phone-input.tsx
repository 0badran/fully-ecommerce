import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { InputHTMLAttributes } from "react";
import PhoneInput, { Props } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

export default function RePhoneInput({
  value,
  onChange,
  ...props
}: Props<InputHTMLAttributes<HTMLInputElement>>) {
  const locale = useLocale();
  const labels = locale === "ar" ? ar : en;

  return (
    <PhoneInput
      international
      value={value}
      className={cn(props.className)}
      defaultCountry="EG"
      countryCallingCodeEditable={false}
      locales={locale}
      labels={labels}
      {...props}
      onChange={(value) => {
        if (onChange) {
          onChange(value);
        }
      }}
    />
  );
}
