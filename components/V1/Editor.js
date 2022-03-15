export default function Editor({ write }) {
  return (
    <textarea
      onChange={(e) => {
        write(e.target.value);
      }}
      className="bg-transparent w-full focus:outline-none resize-none border-2 px-4 py-2 text-base font-mono"
      style={{ height: "calc(100% - 6rem)" }}
      placeholder="Write your asm here..."
    />
  );
}