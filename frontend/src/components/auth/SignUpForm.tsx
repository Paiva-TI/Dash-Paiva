"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EnvelopeIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/supabase/utils";
import Link from "next/link";
import React, { useState } from "react";
import Alert from "../ui/alert/Alert";

export default function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (password !== repeatPassword) {
      setError('As senhas não correspondem')
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { first_name, last_name },
        },
      })

      if (error) throw error

      if (data?.user) {
        await supabase.from('profiles').insert([
          {
            id: data.user.id,
            first_name,
            last_name
          },
        ])
      }
      setSuccess("Conta criada com sucesso!")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className={cn('flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar', className)} {...props}>
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Voltar para login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Criar conta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entre com email e senha para criar sua conta!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.484,7.937v5.477L21.4,14.619a.489.489,0,0,0,.21,0l8.238-5.554a1.174,1.174,0,0,0-.959-1.128Z" fill="#0072c6"/>
                    <path d="M19.484,15.457l1.747,1.2a.522.522,0,0,0,.543,0c-.3.181,8.073-5.378,8.073-5.378V21.345a1.408,1.408,0,0,1-1.49,1.555H19.483V15.457Z" fill="#0072c6"/>
                    <path d="M10.44,12.932a1.609,1.609,0,0,0-1.42.838,4.131,4.131,0,0,0-.526,2.218A4.05,4.05,0,0,0,9.02,18.2a1.6,1.6,0,0,0,2.771.022,4.014,4.014,0,0,0,.515-2.2,4.369,4.369,0,0,0-.5-2.281A1.536,1.536,0,0,0,10.44,12.932Z" fill="#0072c6"/>
                    <path d="M2.153,5.155V26.582L18.453,30V2ZM13.061,19.491a3.231,3.231,0,0,1-2.7,1.361,3.19,3.19,0,0,1-2.64-1.318A5.459,5.459,0,0,1,6.706,16.1a5.868,5.868,0,0,1,1.036-3.616A3.267,3.267,0,0,1,10.486,11.1a3.116,3.116,0,0,1,2.61,1.321,5.639,5.639,0,0,1,1,3.484A5.763,5.763,0,0,1,13.061,19.491Z" fill="#0072c6"/>
                </svg>
                Entre com sua conta Outlook
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Ou
                </span>
              </div>
            </div>
            <form onSubmit={handleSignUp}>
              {error && (
                <Alert
                  variant="error"
                  title="Erro ao criar conta"
                  message={error}
                  showLink={false}
                />
              )}

              {success && (
                <Alert
                  variant="success"
                  title="Sucesso!"
                  message={success}
                  showLink={false}
                />
              )}
              <div className="space-y-5">
                <div className="flex space-x-2">
                  {/* <!-- Primeiro nome --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Nome<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="first_name"
                      placeholder="Digite seu nome"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {/* <!-- Sobrenome --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Sobrenome<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="last_name"
                      placeholder="Digite seu sobrenome"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                  <Input
                    className="pl-[62px]"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <EnvelopeIcon />
                  </span>
                  </div>
                </div>
                {/* <!-- Senha --> */}
                <div>
                  <Label>
                    Senha<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Digite sua senha"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Repetir Senha --> */}
                <div>
                  <Label>
                    Repetir senha<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Digite sua senha novamente"
                      type={showRepeatPassword ? "text" : "password"}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showRepeatPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Ao criar uma conta, você concorda com os{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Termos e Condições,
                    </span>{" "}
                    e nossa{" "}
                    <span className="text-gray-800 dark:text-white">
                      política de privacidade.
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button disabled={!isChecked} className={cn(
    "flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs",
    isChecked ? "bg-brand-500 hover:bg-brand-600" : "bg-gray-400 cursor-not-allowed"
  )}>
                    Criar conta
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5 mb-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Já possui uma conta?{" "}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
