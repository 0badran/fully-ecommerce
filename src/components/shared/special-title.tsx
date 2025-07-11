export default function SpecialTitle({ text }: { text: string }) {
  return (
    <h2 className="font-semibold leading-10 relative before:absolute before:inset-0 indent-10 text-main before:content-[''] before:h-10 before:w-5 before:bg-main before:rounded">
      {text}
    </h2>
  );
}
