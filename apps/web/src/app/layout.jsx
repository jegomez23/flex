import "./globals.css";

export const metadata = {
  title: {
    default: "FLEX",
    template: "%s | FLEX",
  },
  description:
    "FLEX es una plataforma premium de vida nocturna para reservas, pedidos, accesos QR y experiencias VIP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
