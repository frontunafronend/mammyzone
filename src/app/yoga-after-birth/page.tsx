import type { Metadata } from "next";
import { ServiceLandingView } from "@/components/services/ServiceLandingView";
import { generateServiceMetadata } from "@/lib/services/service-seo";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateServiceMetadata("yoga-after-birth");
}

export default function YogaAfterBirthPage() {
  return <ServiceLandingView slug="yoga-after-birth" />;
}
