import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useToast } from "../hooks/useToast";
import { env } from "../utils/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  originalUrl: z.url("URL inválida"),
  shortenedUrl: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Informe uma url minúscula e sem espaço/caracter especial"
    ),
});

type FormData = z.infer<typeof formSchema>;

export function NewLinkForm() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: "",
      shortenedUrl: "",
    },
  });

  const createLinkMutation = useMutation({
    mutationFn: async (values: FormData) => {
      const response = await fetch(`${env.BACKEND_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        if (response.status === 400) throw new Error("URL inválida.");
        if (response.status === 409) throw new Error("URL já cadastrada.");
        throw new Error("Ocorreu um erro inesperado.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
      reset();
    },
    onError: (error: Error) => {
      showToast(error.message || "Ocorreu um erro.", "Erro", "error");
    },
  });

  const onSubmit = (values: FormData) => {
    createLinkMutation.mutate(values);
  };

  return (
    <div className="w-full mt-5">
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Link Original"
          control={control}
          name="originalUrl"
          placeholder="www.exemplo.com.br"
        />
        <Input
          label="Link Encurtado"
          control={control}
          addon="brev.ly/"
          name="shortenedUrl"
        />

        <Button
          variant="primary"
          disabled={createLinkMutation.isPending}
          className="mt-1 h-12"
        >
          {createLinkMutation.isPending ? "Salvando..." : "Salvar link"}
        </Button>
      </form>
    </div>
  );
}
