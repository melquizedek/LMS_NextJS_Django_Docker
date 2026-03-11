import { DashboardLayout } from "@/components/dashboard-layout";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// check for a valid session, cookie, or token.
const checkAuth = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    const isLoggedIn = !!accessToken;
    return { isLoggedIn };
};

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = await checkAuth();

    if (!isLoggedIn) {
        redirect('/login');
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
