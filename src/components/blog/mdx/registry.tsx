import type { MDXComponents } from "mdx/types";
import { BookingCTA } from "./BookingCTA";
import { MdxSafeImg } from "./MdxSafeImg";

export const blogMdxComponents: MDXComponents = {
  BookingCTA,
  img: MdxSafeImg,
};
