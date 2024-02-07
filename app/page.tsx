import DiscordAuth from "../components/DiscordAuth";

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <nav className="flex h-16 w-full justify-center border-b border-b-foreground/10">
        <div className="flex w-full max-w-4xl items-center justify-between p-3 text-sm">
          <DiscordAuth />
        </div>
      </nav>
    </div>
  );
}
