import Download from "@/components/Download";
import { LocalizedAuthor, LocalizedMessage } from "@/components/Localized";
import Stars from "@/components/Stars";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <Stars />
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <LocalizedMessage />

        <Download />
      </div>
      <div className="absolute bottom-4 text-sm text-white">
        <LocalizedAuthor />
      </div>
    </main>
  );
}
