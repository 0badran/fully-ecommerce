import { useLocale } from "next-intl";
import Image from "next/image";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

export default function CountryFlag({
  countryCode,
  withName = true,
}: {
  countryCode: string;
  withName?: boolean;
}) {
  const locale = useLocale();
  const labels = locale === "ar" ? ar : en;
  return (
    <div>
      <Image
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
        width={20}
        height={20}
        alt={countryCode}
        className="aspect-[3/2] inline"
      />
      <span className="align-middle ps-1 text-xs">
        {withName && labels[countryCode as "EG"]}
      </span>
    </div>
  );
}
