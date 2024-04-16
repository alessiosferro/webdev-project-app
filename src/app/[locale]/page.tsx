import { getTranslations } from "next-intl/server";
import { LocaleParams } from "@/model/locale-params.props";
import PostList from "@/components/molecules/PostList";
import getUser from "@/utils/supabase/user";

export default async function Home() {
  const user = await getUser();

  return <PostList user={user} />;
}

export async function generateMetadata({ params: { locale } }: LocaleParams) {
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("seo.dashboard"),
  };
}
