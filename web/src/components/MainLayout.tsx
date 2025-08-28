import { Wrapper } from "./Wrapper";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-dvh flex flex-col items-center justify-start py-8 px-3 md:py-22 md:px-10">
      <Wrapper>{children}</Wrapper>
    </main>
  );
}
