export default function Footer() {
  const links = ["Conditions of Use", "Privacy Notice", "Help"];
  return (
    <div className="center flex-col text-center border-t-2 w-full py-7">
      <div className="flex gap-4 mb-5">
        {links.map((link, key) => (
          <p className="text-11 text-blue-500 cursor-pointer hover:text-orange-600 hover:underline" key={key}>
            {link}
          </p>
        ))}
      </div>
      <p className="text-gray-400">
        @1996 - 2024, Amazon.com, Inc. or its affiliates
      </p>
    </div>
  );
}
