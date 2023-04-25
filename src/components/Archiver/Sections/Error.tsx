import Image from "next/image";

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/alert-triangle.svg"
        width={25}
        height={25}
        alt=""
        role="presentation"
      />
      <p className="italic">{message}</p>
    </div>
  );
}
