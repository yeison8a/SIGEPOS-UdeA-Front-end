export default function Send(){
    return(
        <div className="grid grid-cols-5 grid-rows-12 gap-4">
            <div className="col-span-5 bg-red-500">1</div>
            <div className="col-span-5 row-start-2 bg-green-500">6</div>
            <div className="col-span-5 row-span-2 row-start-3 bg-orange-500">7</div>
            <div className="col-span-5 row-start-5 bg-yellow-500">8</div>
            <div className="col-span-3 row-span-6 col-start-2 row-start-6 bg-blue-500">11</div>
            <div className="col-span-5 row-start-12 bg-pink-500">12</div>
        </div>
    );
}