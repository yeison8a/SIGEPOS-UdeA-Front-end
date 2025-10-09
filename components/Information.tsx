export default function Dashboard() {
    return (
        
        <div className="grid grid-cols-5 grid-rows-9 gap-4">
            <div className="col-span-5 bg-red-500">1</div>
            <div className="col-span-5 row-span-2 row-start-2 bg-green-500">2</div>
            <div className="col-span-5 row-start-4 bg-orange-500">4</div>
            <div className="col-span-3 row-span-5 col-start-2 row-start-5 bg-yellow-500">5</div>
        </div>
    
    );
  }