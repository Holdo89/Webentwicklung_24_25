import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hello World</h1>
      <button><Link href={"/users"}> Zu den Users</Link></button>
    </>
  );
}
