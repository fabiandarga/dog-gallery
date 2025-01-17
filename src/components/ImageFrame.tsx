type ImageFrameProps = {
  url: string;
};

export default function ImageFrame({ url }: ImageFrameProps) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <img src={url} alt="Image" className="object-cover w-full h-full" />
    </div>
  );
}
