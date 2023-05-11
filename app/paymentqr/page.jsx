"use client";

import Image from "next/image";

const Page = () => {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/8769066426`;
    window.open(url, "_blank");
  };

  return (
    <div className="px-4">
      <div className="flex flex-col gap-2 w-full border-b pb-10">
        <h2 className="text-lg">Scan QR </h2>
        <p className="text-xs text-slate-500">Scan QR code to Add Balance</p>
        <div className="w-full flex justify-center py-4">
          <Image src="/images/qr.png" width={400} height={400} />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg">Send Payment Proof</h2>
        <p className="text-xs text-slate-500">
          Click on send proof button & Send the paymennt screenshot & your
          wallet Email id
        </p>

        <button
          className="py-2 shadow-lg rounded bg-blue-500 text-white w-full my-12"
          onClick={handleWhatsAppClick}
        >
          Send Proof
        </button>
      </div>
    </div>
  );
};

export default Page;
