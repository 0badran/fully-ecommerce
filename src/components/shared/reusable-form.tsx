"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CountrySelect from "./country-select";
import RePhoneInput from "./re-phone-input";

type FormSchema = Record<string, any>;

export interface FieldConfig {
  label: string;
  name: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  options?: { title: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  render?: () => React.ReactNode;
  parentClassName?: string;
}

interface ReusableFormProps {
  formAction: (formData: FormData) => void;
  formFields: FieldConfig[];
  renderButton?: React.ReactNode;
  className?: string;
  clearForm?: boolean;
}

export default function ReusableForm({
  formFields,
  formAction,
  renderButton,
  className,
  clearForm,
}: ReusableFormProps) {
  // Iterate on every name in fields and transform it
  const initialSchema: FormSchema = {};
  for (const field of formFields) {
    initialSchema[field.name] = field.value;
  }

  // Init form schema
  const [formSchema, setFormSchema] = useState(initialSchema);

  const resetForm = useCallback(() => {
    if (clearForm) {
      setFormSchema({});
    }
  }, [clearForm]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const updateFormSchema = (
    key: keyof typeof formSchema,
    value: string | Date
  ) =>
    setFormSchema((prev) => {
      return { ...prev, [key]: value };
    });

  function renderField({
    name,
    placeholder,
    className,
    type,
    disabled,
    required,
    render,
    options,
  }: FieldConfig) {
    if (render) {
      return render();
    }

    switch (name) {
      case "phone":
        return (
          <RePhoneInput
            value={formSchema[name]}
            name={name}
            onChange={(v) => updateFormSchema(name, v!)}
            className={cn(
              "w-full border border-black h-10 md:h-14 px-3 rounded-sm",
              formSchema[name] && "border-main",
              className
            )}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
          />
        );
      case "country":
        return (
          <CountrySelect
            id={name}
            name={name}
            value={formSchema[name]}
            onChange={(v) => updateFormSchema(name, v)}
            className={cn(
              "w-full border border-black h-10 md:h-14 px-3 rounded-sm",
              formSchema[name] && "border-main",

              className
            )}
            disabled={disabled}
            placeholder={placeholder}
          />
        );
      case "select":
        if (options) {
          return (
            <Select
              value={formSchema[name]}
              onValueChange={(v) => updateFormSchema(name, v)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ title, value }) => (
                  <SelectItem key={value} value={value}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        return (
          <p className="text-destructive">
            You must pass options field to config
          </p>
        );
      case "birthdate":
        return (
          <Popover>
            <PopoverTrigger
              className={cn(
                "w-full border text-start border-black h-10 md:h-14 px-3 rounded-sm",
                formSchema[name] && "text-black border-main",
                className
              )}
            >
              {formSchema[name] && (
                <div className="flex items-center gap-1 transition">
                  <CalendarDays size={17} />
                  {format(formSchema[name], "yyyy-MM-dd")}
                </div>
              )}
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={formSchema[name]}
                captionLayout="dropdown"
                onSelect={(date) => {
                  updateFormSchema(name, date!);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        );
      case "message":
        return (
          <Textarea
            id={name}
            name={name}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full border border-black md:h-14 px-3 rounded-sm focus-visible:ring-0",
              formSchema[name] && "border-main",
              className
            )}
            value={formSchema[name]}
            onChange={(e) => updateFormSchema(name, e.target.value)}
          />
        );
      default:
        return (
          <Input
            id={name}
            name={name}
            type={type}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full border border-black h-10 md:h-14 px-3 rounded-sm focus-visible:ring-0",
              formSchema[name] && "border-main",
              className
            )}
            value={formSchema[name]}
            onChange={(e) => updateFormSchema(name, e.target.value)}
          />
        );
    }
  }

  return (
    <form
      action={(formData) => {
        formData.append("country", formSchema.country);
        formData.append("birthdate", formSchema.birthdate);
        formAction(formData);
      }}
      className={cn("space-y-5", className)}
    >
      {formFields.map((input) => (
        <div
          key={input.name}
          className={cn("space-y-4", input.parentClassName)}
        >
          <Label htmlFor={input.name}>{input.label}</Label>
          {renderField(input)}
        </div>
      ))}
      {renderButton}
    </form>
  );
}
