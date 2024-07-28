import { useConfirmation } from "../../hooks/confirmation";

export function ConfirmationNotification() {
  const dialog = useConfirmation();
  return <>{dialog}</>;
}
