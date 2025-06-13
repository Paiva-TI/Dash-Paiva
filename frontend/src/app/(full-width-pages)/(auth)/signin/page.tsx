import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dashboard Paiva Energia",
  description: "Página de Login no dashboard da Paiva Energia",
};

export default function SignIn() {
  return <SignInForm />;
}
