import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title:
    "Dashboard | Paiva Energia",
  description: "Página de Dashboard da Paiva Energia",
};

export default function Dashboard() {
  return (redirect('/signin'));
}
