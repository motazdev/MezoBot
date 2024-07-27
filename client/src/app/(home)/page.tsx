import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

import HomeGuildDataBox from "@/components/HomeGuildDataBox";
import Feature from "@/components/features/Feature";
import HomeEmbedEditor from "@/components/home-features/HomeEmbedEditor";
import HomeTicketsSummaryChart from "@/components/home-features/HomeTicketsSummaryChart";
import HomeTicketsTableDemo from "@/components/home-features/HomeTicketsTableDemo";
import "react-quill/dist/quill.snow.css";

import Footer from "@/components/Footer";
import NewsLetterForm from "@/components/NewsLetterForm";
import newsLetterService from "@/services/newsletter";

export default function Home() {
  const addUserNewsletter = async (email: string) => {
    const data = await newsLetterService.addUser({ email });
    return data;
  };
  return (
    <div>
      <Container>
        <div className="flex relative py-36 justify-center text-center gap-y-8 flex-col max-w-2xl mx-auto items-center">
          <div className="absolute bg-blue-800/20 left-12 rounded-full z-0 blur-3xl sm:w-32 sm:h-32 w-20 h-20 md:w-96 md:h-96"></div>

          <h1 className="text-5xl font-semibold mb-3">
            Advanced Tickets System For Your Server
          </h1>
          <p className="text-sm">
            Transform the way you handle support on your Discord server with our
            powerful bot.
          </p>
          <Button variant="default">Add to Discord</Button>
        </div>
      </Container>

      <section
        id="features"
        className="content-section  bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <Container>
          <div className="Feats flex flex-col gap-20">
            <Feature
              header="Track Your Support Tickets with Ease"
              content="Monitor and manage your Discord support tickets effortlessly
                with our comprehensive dashboard. Visualize the status of open,
                claimed, and closed tickets with intuitive charts and graphs.
                Get detailed insights into your support performance and
                streamline your workflow for better efficiency and quality
                assurance."
              display={
                <div className="grid  grid-cols-3 grid-rows-2 gap-4">
                  <div className="grid  w-full h-full row-span-2 row-start-1 md:col-start-2 md:col-span-5 gap-4">
                    <div className="col-span-4">
                      <HomeGuildDataBox boxName="Total Tickets" />
                    </div>
                    <div className="col-span-4 w-full h-full row-span-2 row-start-2">
                      <HomeTicketsSummaryChart />
                    </div>
                  </div>
                </div>
              }
            />
            <Feature
              ltr={false}
              header="Ticket Management Tables"
              content="Easily manage all your support tickets with our table view. Track opened,
             claimed, and closed tickets. Organize tickets, assign tickets to staff members, 
             and monitor their progress. With real-time notifications and a user-friendly interface, 
             managing your community's support needs is simple."
              display={
                <div className="box ">
                  <HomeTicketsTableDemo />
                </div>
              }
            />
            <Feature
              header="Advanced Embed Customization"
              content="Customize and manage your Discord bot's embeds with ease using our 
            dashboard. Update the content, appearance, and structure of any embed 
            directly through the dashboard. Our user-friendly interface makes it simple to keep 
            your bot's communication dynamic. Plus, all changes are synced 
            instantly, providing a seamless experience for both administrators and users."
              display={
                <div className="box ">
                  <HomeEmbedEditor />
                </div>
              }
            />
          </div>
        </Container>
      </section>
      <div className="newsletter-content">
        <div className=" bg-gradient-to-b  from-muted/40 gap-y-5 flex py-24 flex-col justify-center items-center">
          <h3 className="text-xl">Join Our Newsletter</h3>
          <div className="flex max-w-sm items-center ">
            <NewsLetterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
