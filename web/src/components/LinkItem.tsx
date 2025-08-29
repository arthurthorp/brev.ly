import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { env } from "../utils/env";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";
import { useToast } from "../hooks/useToast";
import { LoadingIcon } from "./ui/LoadingIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LinkItemProps {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  visitCount: number;
}

export function LinkItem({
  id,
  originalUrl,
  shortenedUrl,
  visitCount,
}: LinkItemProps) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const formatedUrl = `${env.FRONTEND_URL}/${shortenedUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatedUrl);
      showToast(
        `O link ${formatedUrl} foi copiado para a área de transferência`,
        "Link copiado com sucesso"
      );
    } catch (err) {
      console.error("Falha ao copiar:", err);
      showToast("Não foi possível copiar o link", "Erro", "error");
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${env.BACKEND_URL}/links/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        if (res.status === 404)
          throw new Error("Este link não existe no sistema");

        throw new Error("Ocorreu um erro inesperado");
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
    onError: (err: Error) => {
      showToast(err.message, "Ocorreu um erro", "error");
    },
  });

  const handleDelete = () => {
    const confirmation = confirm("Deseja realmente excluir esse link?");
    if (!confirmation) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="flex justify-between py-4 border-t border-gray-200">
      <div className="flex flex-col gap-1">
        <a
          className="no-underline text-blue-base"
          href={formatedUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography variant="md" weight="semibold" as="span">
            {formatedUrl}
          </Typography>
        </a>

        <Typography
          className="text-gray-500"
          variant="sm"
          weight="regular"
          as="span"
        >
          {originalUrl}
        </Typography>
      </div>

      <div className="flex items-center gap-5">
        <Typography
          className="text-gray-500"
          variant="sm"
          weight="regular"
          as="span"
        >
          {visitCount} acessos
        </Typography>

        <div className="flex items-center gap-1">
          <Button
            onClick={handleCopy}
            className="h-8 w-8 p-0"
            variant="secondary"
          >
            <CopyIcon className="shrink-0" size={16} />
          </Button>

          <Button
            onClick={handleDelete}
            className="h-8 w-8 p-0"
            variant="secondary"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <LoadingIcon />
            ) : (
              <TrashIcon className="shrink-0" size={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
