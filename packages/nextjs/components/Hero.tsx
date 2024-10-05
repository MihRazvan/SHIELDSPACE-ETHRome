import Image from "next/image";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <Image src="/images/logo.svg" alt="Hero" width={260} height={180} />
      <h1 className="text-4xl font-light">{`<nurturing safe connections>`}</h1>
    </div>
  );
};
