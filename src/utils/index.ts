import dayjs from "dayjs";
import { defaultLocale, locales } from "@/navigation";
import { User } from "@supabase/supabase-js";
import UserProfile from "@/model/user-profile.model";

export function getFormattedDate(date: string) {
  return dayjs(date).format("DD MMM YYYY HH:mm:ss");
}

export function getLocalizedPath({
  locale,
  path,
}: {
  locale: string;
  path: string;
}) {
  const pathWithoutLocale = path.replace(
    new RegExp(`^\/(${locales.join("|")})\/`),
    "/",
  );

  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }

  return `/${locale}${pathWithoutLocale}`;
}

export function getUserName(user?: UserProfile) {
  if (!user) return "Anonymous";

  if (!user.last_name) {
    return user.first_name;
  }

  return `${user.first_name} ${user.last_name}`;
}
