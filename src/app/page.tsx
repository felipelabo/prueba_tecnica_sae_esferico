import styles from "./Home.module.scss";
import Link from "next/link";
import { ArrowRight} from 'lucide-react';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-primary-dark text-3xl font-bold text-center">¡Bienvenid@ a la prueba técnica para SAE - Esférico!</h2>
        <Link 
          href="/users" 
          className="w-fit flex gap-2 items-center text-sm text-bg bg-primary-dark hover:bg-primary hover:no-underline p-2 rounded"
        >
          Lista de clientes
          <ArrowRight size={18}/>
        </Link>
      </div>
    </main>
  );
}
