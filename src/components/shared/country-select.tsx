"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Image from "next/image";
import { getCountries } from "react-phone-number-input";
import ar from "react-phone-number-input/locale/ar";
import en from "react-phone-number-input/locale/en";

const countries = getCountries();
type Props = {
  value?: string;
  onChange?: (country: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  id?: string;
};
type CountryCode = (typeof countries)[0];

export default function CountrySelect({
  value,
  onChange,
  placeholder,
  className,
  id,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedCountryCode, setSelectedCountryCode] =
    React.useState<CountryCode>(value as CountryCode);
  const locale = useLocale();
  const labels = locale === "ar" ? ar : en;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="relative">
        <Button
          id={id}
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full font-normal justify-between bg-transparent hover:bg-transparent",
            selectedCountryCode && "indent-10 text-black",
            className
          )}
        >
          <span>
            {selectedCountryCode ? labels[selectedCountryCode] : placeholder}
          </span>
          <ChevronDown size={16} className="opacity-50" />
          {selectedCountryCode && (
            <Image
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountryCode}.svg`}
              width={30}
              height={30}
              alt={labels[selectedCountryCode]}
              className="absolute top-1/2 start-3 -translate-y-1/2 aspect-square"
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder={placeholder} className="h-10 md:h-12" />
          <CommandList>
            <CommandEmpty>
              {locale == "ar" ? "لا يوجد نتائج" : "No results found"}
            </CommandEmpty>
            <CommandGroup>
              {countries.map((country, i) => (
                <CommandItem
                  key={i}
                  value={labels[country]}
                  onSelect={() => {
                    setSelectedCountryCode(country);
                    setOpen(false);
                    if (onChange) {
                      onChange(country);
                    }
                  }}
                >
                  {labels[country]}
                  <Check
                    className={cn(
                      "ml-auto text-black",
                      selectedCountryCode === country
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
