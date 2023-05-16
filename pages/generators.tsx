import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { Chart as ChartJS, ArcElement } from "chart.js/auto";
ChartJS.register(ArcElement);

import { Doughnut } from "react-chartjs-2";

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
];

const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

const borderWidth = 1;

const inter = Inter({ subsets: ["latin"] });

export default function Generators({ generators }: any) {
  const [internalData, setInternalData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { biogas, hydropower, solar, thermal, windpower } = generators;
    const labels: string[] = [
      `${hydropower.name}`,
      `${thermal.name}`,
      `${solar.name}`,
      `${windpower.name}`,
      `${biogas.name}`,
    ];

    const data = [
      hydropower.percentage,
      thermal.percentage,
      solar.percentage,
      windpower.percentage,
      biogas.percentage,
    ];

    //@ts-ignore
    setInternalData((prevstate) => ({
      labels,
      datasets: [
        {
          label: "any",
          data,
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    }));
  }, []);

  const loadData = async () => {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_API || "http://127.0.0.1:5200";
    const response = await fetch(`${baseUrl}/api/generation-types`, {
      referrerPolicy: "unsafe-url",
    });
    const loadData = await response.json();

    const { biogas, hydropower, solar, thermal, windpower } = loadData;
    const labels: string[] = [
      `${hydropower.name}`,
      `${thermal.name}`,
      `${solar.name}`,
      `${windpower.name}`,
      `${biogas.name}`,
    ];

    const data = [
      hydropower.percentage,
      thermal.percentage,
      solar.percentage,
      windpower.percentage,
      biogas.percentage,
    ];

    //@ts-ignore
    setInternalData((prevstate) => ({
      labels,
      datasets: [
        {
          label: "any",
          data,
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    }));

    setLoading(false);
  };

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={`${styles.subheader}`}>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <Image
                src="/renewable-energy.png"
                width="50"
                height="50"
                alt=""
              />
            </div>
            <div>
              <h3 className={`${styles.left}`}>Generation by types</h3>
              <button
                className={`${styles.btn} ${styles.left} ${styles.small}`}
                onClick={loadData}
              >
                {!loading ? "Refresh" : "Loading..."}
              </button>
            </div>
          </div>
        </div>

        {internalData ? (
          <div
            style={{
              width: "400px",
            }}
          >
            <Doughnut
              style={{ width: "100%" }}
              options={{
                maintainAspectRatio: true,
              }}
              data={internalData}
            />
          </div>
        ) : (
          ""
        )}

        <footer className={`${styles.footer}`}>
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

export async function getStaticProps(context: any) {
  const baseUrl = process.env.NEXT_PUBLIC_API || "http://127.0.0.1:5200";
  const response = await fetch(`${baseUrl}/api/generation-types`, {
    referrerPolicy: "unsafe-url",
  });
  const data = await response.json();

  return {
    props: {
      generators: data,
    },
  };
}
