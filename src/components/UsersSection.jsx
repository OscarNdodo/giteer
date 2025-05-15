import { useState } from 'react';

export function UsersSection() {
    const [activeTab, setActiveTab] = useState('developers');

    const developers = [
        {
            login: "torvalds",
            name: "Linus Torvalds",
            avatar: "https://github.com/torvalds.png",
            bio: "Creator of Linux and Git",
            followers: 185000,
            repos: 7
        },
        {
            login: "gaearon",
            name: "Dan Abramov",
            avatar: "https://github.com/gaearon.png",
            bio: "Co-author of Redux and Create React App",
            followers: 98000,
            repos: 342
        },
        {
            login: "yyx990803",
            name: "Evan You",
            avatar: "https://github.com/yyx990803.png",
            bio: "Creator of Vue.js",
            followers: 132000,
            repos: 156
        },
        {
            login: "sindresorhus",
            name: "Sindre Sorhus",
            avatar: "https://github.com/sindresorhus.png",
            bio: "Open source maintainer",
            followers: 51000,
            repos: 1200
        },
        {
            login: "gaearon",
            name: "Dan Abramov",
            avatar: "https://github.com/gaearon.png",
            bio: "Co-author of Redux and Create React App",
            followers: 98000,
            repos: 342
        },
        {
            login: "yyx990803",
            name: "Evan You",
            avatar: "https://github.com/yyx990803.png",
            bio: "Creator of Vue.js",
            followers: 132000,
            repos: 156
        },
        {
            login: "sindresorhus",
            name: "Sindre Sorhus",
            avatar: "https://github.com/sindresorhus.png",
            bio: "Open source maintainer",
            followers: 51000,
            repos: 1200
        },
    ];

    return (
        <section className="py-40 bg-orange-50">
            <div className="container mx-auto px-4">

                <div className='w-full flex items-start justify-between border-b-2 border-black/30  mb-9'>
                    <h2 className="text-2xl font-extrabold text-left uppercase  text-gray-800">
                        Membros frequentes
                    </h2>

                    {/* Tabs */}
                    {/* <div className="flex justify-center mb-2">
                        <div className="inline-flex bg-white rounded-lg shadow">
                            <button
                                onClick={() => setActiveTab('developers')}
                                className={`px-8 py-2 rounded-md ${activeTab === 'developers' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Desenvolvedores
                            </button>
                        </div>
                    </div> */}
                </div>

                {/* Conteúdo das Tabs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {
                        developers.map((user, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col items-center text-center">
                                    <img
                                        src={user.avatar}
                                        alt={user.login}
                                        className="w-20 h-20 rounded-full mb-4 border-2 border-amber-100"
                                    />
                                    <h3 className="font-bold text-gray-900">{user.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">@{user.login}</p>
                                    <p className="text-gray-700 mb-4">{user.bio}</p>
                                    <div className="flex justify-between w-full text-sm text-gray-500">
                                        <span>Seguidores: {Math.round(user.followers / 1000)}k</span>
                                        <span>Repos: {user.repos}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="text-center mt-8">
                    <button className="px-5 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
                        Ver mais desenvolvedores
                    </button>
                </div>
            </div>
        </section>
    );
}