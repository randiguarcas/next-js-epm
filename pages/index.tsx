import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.grid}>
          <Link
            href="generators"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <div className="home-card">
              <Image
                src="/renewable-energy.png"
                width="50"
                height="50"
                alt=""
              />

              <h3>
                Generation by types <span>-&gt;</span>
              </h3>
            </div>
            <p
              style={{
                marginTop: "5px",
              }}
            >
              This action has been created only for play with routes.
            </p>
          </Link>

          <Link href="plants" className={styles.card} rel="noopener noreferrer">
            <div className="home-card">
              <Image src="/nuclear.png" width="50" height="50" alt="" />

              <h3>
                Generation by plants <span>-&gt;</span>
              </h3>
            </div>
            <p
              style={{
                marginTop: "5px",
              }}
            >
              This action has been created only for play with routes.
            </p>
          </Link>
        </div>
        <footer>
          by: &nbsp;
          <Link href="https://github.com/randiguarcas" target="_blank">
            Randi Guarcas &nbsp;
            <Image src="/github-sign.png" width="15" height="15" alt="" />
          </Link>
        </footer>
      </main>
    </>
  );
}
