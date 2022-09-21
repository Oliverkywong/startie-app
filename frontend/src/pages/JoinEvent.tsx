export default function JoinEvent(props: {
  result: string[];
  setResultBox: (result: boolean) => void;
}) {
  return (
    <div className="ProfileBackground">
      <div>{props.result}DONE!!</div>
    </div>
  );
}
