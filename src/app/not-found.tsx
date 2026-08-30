import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <p className="eyebrow">404</p>
      <h1 className="text-3d-pink mt-2 font-display text-2xl sm:text-3xl">PAGE NOT FOUND</h1>
      <p className="mt-4 text-paper/70">That link does not go anywhere any more.</p>
      <Link href="/" className="btn-pink mt-6 px-4 py-2 text-sm">
        Back to the arcade
      </Link>
    </div>
  );
}
