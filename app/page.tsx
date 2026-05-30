import { redirect } from "next/navigation";

// Redireciona para /auth — a lógica de auth fica em cada página
export default function Root() {
  redirect("/auth");
}
