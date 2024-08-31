import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen p-6 bg-background absolute left-0 top-0 z-50 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
