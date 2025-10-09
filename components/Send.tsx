export default function Send(){
    return(
        <div className="grid grid-cols-5 grid-rows-12 gap-4">
            <div className="col-span-5 bg-red-500">1</div>
            <div className="col-span-5 col-start-1 row-start-12 bg-blue-500">3</div>
            <div className="col-span-3 row-span-10 col-start-2 row-start-2 bg-green-500">8</div>
        </div>
    );
}