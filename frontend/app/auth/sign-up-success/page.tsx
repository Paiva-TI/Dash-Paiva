import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Obrigado por se cadastrar!</CardTitle>
              <CardDescription>Cheque seu email para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seu cadastro foi um sucesso. Por favor cheque seu email para confirmar sua conta
                antes de fazer login.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
