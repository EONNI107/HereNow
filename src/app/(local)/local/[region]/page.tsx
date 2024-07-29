import LocalListPage from '@/components/LocalList/LocalListPage';

function Page({ params }: { params: { region: string } }) {
  return <LocalListPage region={params.region} />;
}
export default Page;
