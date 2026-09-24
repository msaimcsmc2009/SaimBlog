import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AdminPanel } from "@/components/admin/admin-panel";

export const metadata: Metadata = {
  title: "Mesaj Kutusu",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pb-24 pt-32 md:pb-32 md:pt-40">
      <Container>
        <AdminPanel />
      </Container>
    </div>
  );
}