import Image from "next/image";

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/icons/alert-triangle.svg"
        width={25}
        height={25}
        alt=""
        role="presentation"
      />
      <p className="font-bold italic">{message}</p>
    </div>
  );
}
