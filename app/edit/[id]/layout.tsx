import Header from "@/components/ui/Header";

export default function EditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
}
