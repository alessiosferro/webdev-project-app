import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import {redirect} from "@/navigation";
import {createClient} from "@/utils/supabase/server";
import LoginForm from "@/components/organisms/LoginForm";

export const generateMetadata = async ({
                                         params: {locale},
                                       }: LocaleParams) => {
  const t = await getTranslations({namespace: "common", locale});

  return {
    title: t("seo.login"),
  };
};

export default async function LoginPage() {
  const supabase = createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return <LoginForm/>;
}
