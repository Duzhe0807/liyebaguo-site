import { languages } from "../languages";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
