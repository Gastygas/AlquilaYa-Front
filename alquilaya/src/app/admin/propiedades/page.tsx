import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./propiedades.module.css"
import Link from 'next/link';
import ApprovedProperties from '@/Components/ApprovedProperties/ApprovedProperties';
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/property`, {
    method: "GET",
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Error al obtener los usuarios');

  const properties = await res.json()

  return (
    <ProtectedRoute adminOnly={true}>
    <div>
      <HeaderAdmin />
      <div className='container'>
        <div className='padding-section'>
          <h1 className="pb-12 text-primary">Propiedades</h1>
      <ApprovedProperties properties={properties}/>
        <Link href="/admin"><button className={styles.button}>Volver</button></Link>
      </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default page