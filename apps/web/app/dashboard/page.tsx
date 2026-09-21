import { ActivityChart } from "./ActivityChart";
import { AIPipeline } from "./AIPipeline";
import { DashboardFooter } from "./DashboardFooter";
import { DashboardHeader } from "./DashboardHeader";
import { MetricsGrid } from "./MetricsGrid";
import { RecentProjects } from "./RecentProjects";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#212121] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <DashboardHeader />

        <MetricsGrid />

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <ActivityChart />
          <AIPipeline />
        </section>

        <RecentProjects />

        <DashboardFooter />
      </div>
    </main>
  );
}