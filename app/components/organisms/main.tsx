import UrlForm from "../molecules/UrlForm";

export default function Main() {
  return (
    <main className="flex flex-col gap-4  h-screen items-start justify-center">
      <h1 className="text-4xl font-bold text-center">URL Shortener</h1>
      <UrlForm
        placeholder="Enter a URL"
        buttonText="Shorten"
        onClick={() => { }}
      />
    </main>
  )
}