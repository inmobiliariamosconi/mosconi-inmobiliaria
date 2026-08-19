import Hero from "@/components/sections/Hero";
import Propiedades from "@/components/sections/Propiedades";
import Servicios from "@/components/sections/Servicios";
import ClosingCta from "@/components/sections/ClosingCta";
import Ubicacion from "@/components/sections/Ubicacion";

export default function Home() {
  return (
    <>
      <Hero />
      <Propiedades />
      <ClosingCta />
      <Ubicacion />
      <Servicios />
    </>
  );
}
