import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl m-auto">
          <div className="w-full h-16 flex flex-col justify-center">
            <h1 className="text-center text-3xl font-bold">Country Info App</h1>
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
