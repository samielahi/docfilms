type Props = {
  onClick: () => void;
};

export default function NextButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className="arrow-button pointer-events-auto relative inline-block w-[125px] px-4 py-2 font-bold"
    >
      <span className="arrow-button-text">Next</span>
    </button>
  );
}
