import Image from "next/image";

type Icon =
  | "alert"
  | "archive"
  | "movie"
  | "director"
  | "search"
  | "upload"
  | "edit"
  | "confirm"
  | "review"
  | "index"
  | "signIn"
  | "quarter"
  | "recent"
  | "loader"
  | "signOut";

type Props = {
  name: Icon;
};

export default function Icon({ name }: Props) {
  return (
    <Image
      width={25}
      height={25}
      src={getIconPath(name)}
      alt=""
      role="presentation"
      className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
    />
  );
}

function getIconPath(name: Icon) {
  switch (name) {
    case "alert":
      return "/icons/alert-triangle.svg";
    case "archive":
      return "/icons/archive.svg";
    case "movie":
      return "/icons/film.svg";
    case "director":
      return "/icons/megaphone.svg";
    case "search":
      return "/icons/search.svg";
    case "upload":
      return "/icons/file-up.svg";
    case "edit":
      return "/icons/edit.svg";
    case "review":
      return "/icons/clipboard-check.svg";
    case "confirm":
      return "/icons/check-circle.svg";
    case "index":
      return "/icons/folder-search-2.svg";
    case "signIn":
      return "/icons/log-in.svg";
    case "signOut":
      return "/icons/log-out.svg";
    case "quarter":
      return "/icons/calendar-clock.svg";
    case "recent":
      return "/icons/clock.svg";
    case "loader":
      return "/icons/loader-2.svg";
  }
}
