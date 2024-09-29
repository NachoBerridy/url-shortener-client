import UrlForm from "../molecules/UrlForm";

export default function Main() {
  return (
    <main className="flex flex-col gap-8  items-start justify-start mt-10 w-full max-w-[1020px]">
      <h1 className="text-4xl font-bold text-center">URL Shortener</h1>
      <UrlForm
        placeholder="Enter a URL"
        buttonText="Shorten"
        onClick={() => { }}
      />
    </main>
  )
}