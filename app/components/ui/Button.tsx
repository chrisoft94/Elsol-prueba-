// components/ui/Button.tsx
import { cn } from "@/lib/utils";

export default function Button({ children, className, ...props }: any) {
  return (
    <button
      className={cn("bg-indigo-600 text-white px-4 py-2 rounded-md", className)}
      {...props}
    >
      {children}
    </button>
  );
}