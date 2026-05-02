import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const iconCache: Record<string, React.ComponentType<LucideProps>> = {};

export function Icon({ name, ...props }: IconProps) {
  if (!iconCache[name]) {
    // eslint-disable-next-line react-hooks/immutability
    iconCache[name] = dynamic(dynamicIconImports[name]);
  }
  const LucideIcon = iconCache[name];
  return <LucideIcon {...props} />;
}
