"use client";

import { Box, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { colorScheme } from "@/utils/chakra/theme";

export default function Footer() {
  const t = useTranslations("common");

  return (
    <Box textAlign="center" py="2rem" as="footer">
      {t("footer.copy")}{" "}
      <Button
        as="a"
        variant="link"
        colorScheme={colorScheme}
        href="https://www.linkedin.com/in/alessiosferro/"
      >
        Alessio Sferro
      </Button>
    </Box>
  );
}
