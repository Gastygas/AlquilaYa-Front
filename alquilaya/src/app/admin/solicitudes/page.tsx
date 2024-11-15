import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin';
import PropertiesHistory from '@/Components/PropertiesHistory/PropertiesHistory';
import PendingPropertiesTable from '@/Components/PendingProperties/PendingProperties';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const SolicitudesPage = async () => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property`, {
    method: "GET",
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener las propiedades');

  const properties = await res.json();

  return (
    <ProtectedRoute adminOnly={true}>
    <div>
      <HeaderAdmin />
      <div className="container">
        <div className="padding-section">
          <h1 className="pb-12 text-primary">Solicitudes</h1>
          <PendingPropertiesTable properties={properties} />
          <h1 className="py-12 text-primary">Historial</h1>
          <PropertiesHistory properties={properties} />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default SolicitudesPage;
