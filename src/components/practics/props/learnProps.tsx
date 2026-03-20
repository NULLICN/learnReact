export default function LearnProps({
  id,
  tag = "unknown",
  name = "unknown",
}: {
  id: number;
  tag: string;
  name: string;
}) {
  return (
    <>
      <p>ID: {id}</p>
      <p>Tag: {tag}</p>
      <p>Name: {name}</p>
    </>
  );
}
