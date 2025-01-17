type ShuffleButtonProps = {
  onClick: () => void;
};

export default function ShuffleButton( { onClick }: ShuffleButtonProps) {
  return (
    <button type="button" className="px-10 py-5 bg-[#3DA4F8]" onClick={onClick}>Shuffle</button>
  );
}
