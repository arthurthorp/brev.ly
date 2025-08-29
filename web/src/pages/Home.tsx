import { MainLayout } from "../components/MainLayout";
import { Header } from "../components/Header";
import { NewLinkSection } from "../components/NewLinkSection";
import { LinkListSection } from "../components/LinkListSection";

export function Home() {
  return (
    <MainLayout>
      <Header />
      <div className="w-full flex items-start gap-5 flex-col md:flex-row">
        <NewLinkSection />
        <LinkListSection />
      </div>
    </MainLayout>
  );
}
