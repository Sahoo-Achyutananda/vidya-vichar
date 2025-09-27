

function HeroSection(){
    return (
        <>
            <div className="w-[50%] flex flex-col justify bg-green-800">
                <button>Create Group</button>
            </div>
            <div className="w-[50%] flex flex-col justify gap-[10px]">
                <input type="text" />
                <button>Join Group</button>
            </div>
        </>
        
    )
}

function Dashboard() {
    return (
        <div className="w-[100%] flex flex-row ">
            <HeroSection/>
        </div>
    )
}

export default Dashboard
