import React, { useEffect } from "react";

const InstallPWAButton: React.FC = () => {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      // **Trigger immediately** (no deferral)
      (e as any).prompt();
      (e as any).userChoice.then((choice: { outcome: string }) => {
        if (choice.outcome === "accepted") {
          console.log("User accepted PWA install");
        }
      });
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  return null; // Or render a custom button if needed
};

export default InstallPWAButton;
