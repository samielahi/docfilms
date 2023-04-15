import Link from "next/link";

export default function Logo(props: { size: "small" | "large" }) {
  const { size } = props;
  return (
    <>
      <Link href={"/"} tabIndex={size === "large" ? -1 : 1} className="w-fit">
        <div className={`flex w-fit flex-col items-end gap-0 leading-3`}>
          <h1
            className={`font-heading ${
              size === "large" ? "text-5xl md:text-7xl" : "text-3xl"
            } `}
          >
            docfilms
          </h1>
          <p className={`font-heading italic text-gray`}>archive</p>
        </div>
      </Link>
    </>
  );
}
