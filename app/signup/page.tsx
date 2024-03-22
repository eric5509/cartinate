import { GetSession } from "@/actions/GetSession";
import Footer from "@/components/Auth/Footer";
import Main from "@/components/Signup/Main";
import { redirect } from "next/navigation";

export default async function page() {
  const session: any = await GetSession()
  if(session?.id){
    redirect('/')
  }
  return (
    <main className="flex containr items-center min-h-screen pt-10 flex-col justify-between gap-4">
      <Main />
      <Footer />
    </main>
  );
}
