import SearchComponent from "@/components/shared/SearchComponent";

export default function Home() {
  return (
    <main className="min-h-screen p-4 py-40 md:p-24">
      <div className="flex flex-col gap-4 md:gap-16 items-center justify-center h-full md:py-24">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">
          Weather Search
        </h1>
        <SearchComponent />
      </div>
    </main>
  );
}
