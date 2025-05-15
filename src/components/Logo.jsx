export function Logo({ size }) {
    return (
        <>
            <div onClick={() => navigate("/")} className="flex cursor-pointer items-center space-x-2">
                <div className={`w-8 h-8 bg-[#d84506] rounded-lg flex items-center justify-center`}>
                    <svg className={`w-${size} h-${size} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#d84506] to-orange-400 bg-clip-text text-transparent">Giteer</h1>
            </div>
        </>
    )
}