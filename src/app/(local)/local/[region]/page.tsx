import LocalListPage from '@/components/LocalList/LocalListPage';
import RegionHeader from '@/components/LocalList/RegionHeader';

function Page({ params }: { params: { region: string } }) {
  return (
    <div className="max-w-md mx-auto my-4">
      <RegionHeader region={params.region} />
      <LocalListPage region={params.region} />
    </div>
  );
}
export default Page;
