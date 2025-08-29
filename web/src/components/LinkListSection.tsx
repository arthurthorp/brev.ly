import { useMutation, useQuery } from "@tanstack/react-query";
import { LinkItem } from "./LinkItem";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Typography } from "./ui/Typography";
import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { env } from "../utils/env";
import { LoadingIcon } from "./ui/LoadingIcon";
import { LoadingBar } from "./ui/LoadingBar";
import { useToast } from "../hooks/useToast";

export function LinkListSection() {
  const { showToast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const res = await fetch(`${env.BACKEND_URL}/links`);

      return res.json();
    },
  });

  const downloadCSV = (csvUrl: string) => {
    const urlParts = csvUrl.split("/");
    const filename = urlParts[urlParts.length - 1] || "links.csv";

    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${env.BACKEND_URL}/links/exports`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Erro ao gerar CSV");

      const data = await response.json();
      return data.reportUrl as string;
    },
    onSuccess: (reportUrl) => {
      downloadCSV(reportUrl);
    },
    onError: () => {
      showToast("Ocorreu um erro ao gerar CSV", "Ocorreu um erro", "error");
    },
  });

  const handleExport = () => {
    exportMutation.mutate();
  };

  return (
    <Card className="flex flex-col max-w-[580px]">
      {isLoading && <LoadingBar />}
      <div className="flex justify-between items-center">
        <Typography
          variant="lg"
          weight="bold"
          className="text-gray-600"
          as="h2"
        >
          Meus links
        </Typography>

        <Button
          onClick={handleExport}
          className="h-8 flex items-center gap-[6px]"
          variant="secondary"
          disabled={exportMutation.isPending}
        >
          {exportMutation.isPending ? (
            <LoadingIcon size={16} />
          ) : (
            <>
              <DownloadSimpleIcon size={16} />
              <Typography as="span" variant="sm" weight="semibold">
                Baixar CSV
              </Typography>
            </>
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="w-full flex-1 mt-5 border-t border-gray-200 flex flex-col items-center justify-center">
          <LoadingIcon className="text-gray-400" size={32} />
          <Typography
            className="text-gray-400"
            variant="sm"
            weight="regular"
            uppercase
          >
            Carregando Links...
          </Typography>
        </div>
      ) : data.links.length > 0 ? (
        <div className="mt-5 scrollbar overflow-y-auto flex-1 max-h-[280px]">
          {data.links.map(
            (link: {
              id: string;
              originalUrl: string;
              shortenedUrl: string;
              visitCount: number;
            }) => (
              <LinkItem
                id={link.id}
                originalUrl={link.originalUrl}
                shortenedUrl={link.shortenedUrl}
                visitCount={link.visitCount}
                key={link.id}
              />
            )
          )}
        </div>
      ) : (
        <div className="w-full flex-1 mt-5 border-t border-gray-200 flex flex-col items-center justify-center">
          <LinkIcon size={32} className="text-gray-400" />
          <Typography className="mt-3" variant="xs" weight="regular" uppercase>
            Ainda não existem links cadastrados
          </Typography>
        </div>
      )}
    </Card>
  );
}
