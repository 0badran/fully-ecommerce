import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
interface Props {
  text: string;
  className?: string;
}
export default function MainButton({
  text,
  className,
  ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={cn(
        "bg-main rounded text-white h-[56px] leading-[56px] hover:bg-main-hover",
        className
      )}
      {...props}
    >
      {text}
    </Button>
  );
}
