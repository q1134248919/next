import Link from "next/link";
export const dynamic = "force-dynamic";
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </body>
    </html>
  );
}
