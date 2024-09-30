import React, { useEffect, useState } from "react";
import conf from "../conf/conf";
import appwriteService from "../Appwrite/config";

function Logo({ width = "100px" }) {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const fileId = conf.logoID;
        const previewUrl = appwriteService.getFilePreview(fileId);
        setLogoUrl(previewUrl);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div style={{ width }}>
      <img src={logoUrl} alt="Logo" />
    </div>
  );
}

export default Logo;
