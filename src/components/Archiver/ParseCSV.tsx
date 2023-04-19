import { useArchiver } from "./ArchiverContext";
import { csv } from "./csv";

export default function ParseCSV() {
  const { csvString } = useArchiver()!;
  let test: any;
  if (csvString) {
    test = csv.parse(csvString);
  }
  console.log(test);

  return (
    <>
      <div>hi</div>
    </>
  );
}
