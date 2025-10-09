import Information from "../../../components/Information";
import ProgressBar from "../../../components/ProgressBar";
export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
        <div className="w-full bg-red-500 p-4">1</div>
        <div className="flex-1 flex gap-4">
          <div className="w-1/5 bg-green-500 p-4">2</div>
          <div className="flex-1 bg blue-500 p-4">
            <div className="">
              <ProgressBar />
            </div>
          </div>
        </div>
    </div>
  );
}