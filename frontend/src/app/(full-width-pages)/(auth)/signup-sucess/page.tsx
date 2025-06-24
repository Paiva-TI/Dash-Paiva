import { Metadata } from "next";
import SignUpSucessForm from "@/components/auth/SignUpSucess"

export const metadata: Metadata = {
  title: "Conta criada | Dashboard Paiva Energia",
  description: "Página de conta criada no dashboard da Paiva Energia",
};

export default function SignUpSucess() {
  return <SignUpSucessForm />;
}
