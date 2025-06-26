import Alert from "@/components/ui/alert/Alert";

interface Props {
  searchParams?: { status?: string };
}

export default function SignupSuccessPage({ searchParams }: Props) {
  const status = searchParams?.status;

  return (
    <div className="p-4">
      {status === "success" && (
        <Alert
          variant="success"
          title="Cadastro concluído!"
          message="Sua conta foi criada com sucesso. Agora você pode fazer login."
          showLink
          linkHref="/signin"
          linkText="Ir para login"
        />
      )}
    </div>
  );
}
