import { redirect } from "next/navigation";
import { lanes, type Lane } from "@/lib/site";

// Lanes used to be their own pages. All work now lives on one list, so old lane URLs land on the work page.
export function generateStaticParams() { return (Object.keys(lanes) as Lane[]).map((lane) => ({ lane })); }
export default function LaneRedirect() {
  redirect("/work");
}
