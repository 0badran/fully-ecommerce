import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ElementType } from "react";
interface Props {
  text: string;
  className?: string;
  Icon?: ElementType;
}
export default function MainButton({
  text,
  className,
  Icon,
  ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={cn(
        "bg-main rounded text-white hover:bg-main-hover",
        className
      )}
      {...props}
    >
      {Icon && <Icon />}
      {text}
    </Button>
  );
}
