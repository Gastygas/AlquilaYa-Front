import HeaderAdmin from '@/Components/HeaderAdmin/HeaderAdmin'
import styles from "./admin.module.css"
import Link from 'next/link'
import ProtectedRoute from '@/Components/ProtectRoutes/ProtecRoutes';

const page = async() => {

    const url = "http://localhost:3001";

        const [usersRes, propertiesRes] = await Promise.all([
          fetch(url + "/users", { method: "GET", cache: "no-store" }),
          fetch(url + "/property", { method: "GET", cache: "no-store" })
        ]);
    
        if (!usersRes.ok) throw new Error("Error al obtener los usuarios");
        if (!propertiesRes.ok) throw new Error("Error al obtener las propiedades");
    
        const usersData = await usersRes.json();
        const propertiesData = await propertiesRes.json();

    return (
        <ProtectedRoute adminOnly={true}>
        <div>
            <HeaderAdmin />
            <div className='container'>
                <div className='padding-section'>
                    <h1 className="pb-12 text-primary">Dashboard</h1>
                    <div className='grid grid-cols-3 gap-8 w-full'>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Usuarios Registrados</h3>
                            <h4 className='text-white py-4 text-center'>{usersData.length} usuarios activos</h4>
                            <Link href="/admin/usuarios"><button className={styles.button}>Ver Más</button> </Link>
                        </div>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Propiedades activas</h3>
                            <h4 className='text-white py-4 text-center'>{propertiesData.length} Propiedades</h4>
                            <Link href="/admin/propiedades"><button className={styles.button}>Ver Más</button></Link>
                        </div>
                        <div className='bg-primary p-6 rounded-lg'>
                            <h3 className='text-white text-center'>Total transacciones</h3>
                            <h4 className='text-white py-4 text-center'>$500 USD</h4>
                            <Link href="/admin/transacciones"><button className={styles.button}>Ver Más</button></Link>
                        </div>
                        
                        


                    </div>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    )
}

export default page