export default function Description(){
    return(
        <div className="grid grid-cols-5 grid-rows-12 gap-4">
            <div className="col-span-5 bg-red-500">1</div>
            <div className="col-span-5 col-start-1 row-start-12 bg-blue-500">3</div>
            <div className="col-span-5 row-span-2 col-start-1 row-start-2 bg-green-500">5</div>
            <div className="col-span-3 row-span-8 col-start-2 row-start-4 bg-orange-500">8</div>
        </div>
    
    );
}