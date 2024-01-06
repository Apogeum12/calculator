import { invoke } from "@tauri-apps/api/core";

export const isDesktop = async (): Promise<boolean> => {
  try {
    const isDesktop: boolean | undefined = await invoke?.("is_desktop");
    return !isDesktop ? false : isDesktop;
  } catch {
    return false;
  }
};
