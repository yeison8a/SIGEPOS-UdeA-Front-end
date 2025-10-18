"use client";

import Information from "./Information";
import Description from "./Description";
import Cohort from "./Cohort";
import UploadSection1 from "./AnnexesOne";
import UploadSection2 from "./AnnexesTwo";
import SendStep from "./Send";

interface DashboardContentProps {
  currentStep: number;
}

export default function DashboardContent({ currentStep }: DashboardContentProps) {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Information />;
      case 2:
        return <Description />;
      case 3:
        return <Cohort />;
      case 4:
        return <UploadSection1 />;
      case 5:
        return <UploadSection2 />;
      case 6:
        return <SendStep />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-15 py-4">
      {renderStepContent()}
    </div>
  );
}
