import { NewLinkForm } from "./NewLinkForm";
import { Card } from "./ui/Card";
import { Typography } from "./ui/Typography";

export function NewLinkSection() {
  return (
    <Card className="max-w-[380px]">
      <Typography variant="lg" weight="bold" className="text-gray-600" as="h2">
        Novo link
      </Typography>

      <NewLinkForm />
    </Card>
  );
}
