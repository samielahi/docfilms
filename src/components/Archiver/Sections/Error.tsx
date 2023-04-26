import Image from "next/image";
import Icon from "~/components/Icon";

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-4">
      <Icon name="alert" />
      <p className="font-bold italic">{message}</p>
    </div>
  );
}
