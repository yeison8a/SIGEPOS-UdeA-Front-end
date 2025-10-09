import { useState } from "react";
export default function Dashboard() {
    const [value, setValue] = useState("");
    return (
        
        <div className="grid grid-cols-6 grid-rows-12 gap-4">
            <div className="col-span-6 bg-red-500">1</div>
            <div className="col-span-6 col-start-1 row-start-12 bg-blue-500">3</div>
            <div className="col-span-4 row-span-10 col-start-2 row-start-2 bg-green-500">9
            </div>
        </div>
    
    );
  }