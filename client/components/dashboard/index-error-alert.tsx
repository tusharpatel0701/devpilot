import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type IndexErrorAlertProps = {
  message?: string | null;
  onDismiss?: () => void;
};

export function IndexErrorAlert({ message, onDismiss }: IndexErrorAlertProps) {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="relative pr-12">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Indexing failed</AlertTitle>
      <AlertDescription className="break-words">{message}</AlertDescription>
      {onDismiss && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className="absolute right-2 top-2 h-7 w-7"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}
