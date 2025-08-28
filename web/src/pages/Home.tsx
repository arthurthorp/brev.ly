import { MainLayout } from "../components/MainLayout";
import { Header } from "../components/Header";
import { NewLinkSection } from "../components/NewLinkSection";

export function Home() {
  return (
    <MainLayout>
      <Header />
      <div className="w-full flex gap-5 flex-col md:flex-row">
        <NewLinkSection />
      </div>
    </MainLayout>
  );
}
