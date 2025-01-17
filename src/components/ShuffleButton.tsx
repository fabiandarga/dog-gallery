import { Button } from "./ui/button";

type ShuffleButtonProps = {
  onClick: () => void;
};

export default function ShuffleButton( { onClick }: ShuffleButtonProps) {
  return (
    <Button type="button" className="px-10 py-5" onClick={onClick}>Shuffle</Button>
  );
}
