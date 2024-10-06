import Image from "next/image";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Image
        src="/images/logo.svg"
        alt="Hero"
        width={260}
        height={180}
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      <h1 className="text-2xl sm:text-4xl font-light">{`<nurturing safe connections>`}</h1>
    </div>
  );
};
