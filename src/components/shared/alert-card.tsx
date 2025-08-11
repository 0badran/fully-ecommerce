import { CheckCircle2, CircleX, Info, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  dec?: string;
  variant?: "info" | "warning" | "error" | "success";
  className?: string;
}

const variants = {
  info: { style: "bg-blue-50 text-blue-500 border-blue-500", icon: Info },
  warning: {
    style: "bg-amber-50 text-amber-500 border-amber-500",
    icon: TriangleAlert,
  },
  error: { style: "bg-red-50 text-red-500 border-red-500", icon: CircleX },
  success: {
    style: "bg-green-50 text-green-500 border-green-500",
    icon: CheckCircle2,
  },
};

export default function AlertCard({
  title,
  dec,
  variant = "info",
  className,
}: Props) {
  const styles = variants[variant];
  return (
    <Alert className={cn(styles.style, className)}>
      <styles.icon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{dec}</AlertDescription>
    </Alert>
  );
}
