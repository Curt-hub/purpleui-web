import { useState } from 'react';
import { lightenHex, getLogoOrientation, type LogoOrientation } from './utils/colorUtils';

interface LogoDims { w: number; h: number }

export interface BrandConfig {
  firstName: string;
  companyName: string;
  primaryColor: string;
  logoFile: File | null;
  logoDataUrl: string | null;
  logoOrientation: LogoOrientation | null;
  logoNaturalDims: LogoDims | null;
  gradientTo: string;
  passTitle: string;
}

export function useBrandConfig() {
  const [firstName, setFirstName]       = useState('Curt');
  const [companyName, setCompanyName]   = useState('ACME');
  const [primaryColor, setPrimaryColor] = useState('#7458FD');
  const [logoFile, setLogoFile]         = useState<File | null>(null);
  const [logoDataUrl, setLogoDataUrl]   = useState<string | null>(null);
  const [logoOrientation, setLogoOrientation] = useState<LogoOrientation | null>(null);
  const [logoNaturalDims, setLogoNaturalDims] = useState<LogoDims | null>(null);

  function handleLogoUpload(file: File) {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        setLogoDataUrl(dataUrl);
        setLogoNaturalDims({ w, h });
        setLogoOrientation(getLogoOrientation(w, h));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  function clearLogo() {
    setLogoFile(null);
    setLogoDataUrl(null);
    setLogoOrientation(null);
    setLogoNaturalDims(null);
  }

  const gradientTo = lightenHex(primaryColor, 0.3);
  const passTitle  = `${firstName}'s ${companyName} WiFi Pass`;

  function exportConfig(): string {
    return JSON.stringify(
      { firstName, companyName, primaryColor, gradientTo, passTitle, logoOrientation },
      null, 2
    );
  }

  return {
    firstName,    setFirstName,
    companyName,  setCompanyName,
    primaryColor, setPrimaryColor,
    logoFile,
    logoDataUrl,
    logoOrientation,
    logoNaturalDims,
    handleLogoUpload,
    clearLogo,
    gradientTo,
    passTitle,
    exportConfig,
  };
}
