import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta | Dashboard Paiva Energia",
  description: "Página de criar conta no dashboard da Paiva Energia",
};

export default function SignUp() {
  return <SignUpForm />;
}
