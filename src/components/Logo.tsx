export default function Logo(props: { size: "small" | "large" }) {
  const { size } = props;
  return (
    <>
      <div className={`flex w-fit flex-col items-end gap-0 leading-3`}>
        <h1
          className={`${
            size === "large" ? "text-5xl md:text-7xl" : "text-3xl"
          } `}
        >
          docfilms
        </h1>
        <p className={`font-bold italic text-gray`}>archive</p>
      </div>
    </>
  );
}