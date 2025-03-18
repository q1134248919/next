import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
import { routing } from "./i18n/routing";

import { chain, FinalNextResponse } from "@nimpl/middleware-chain";

const intlMiddelware = createMiddleware(routing);

export default chain([
  intlMiddelware,
  (req) => {
    if (req.summary.type === "redirect") return FinalNextResponse.next();
  },
  auth as any,
]);
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
