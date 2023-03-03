import { Filters, PageLayout, Places } from "@comps";

export default function Home() {
  return (
    <PageLayout title="Home">
      <Filters />
      <Places />
    </PageLayout>
  );
}
